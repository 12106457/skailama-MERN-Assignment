const mongoose = require('mongoose'); 
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../model/userModel");

exports.userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ status: false, message: "Need all fields data" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUserData = await userModel.create({ ...req.body, password: hashedPassword });

        res.status(200).send({
            status: true,
            message: "Registration successful!",
            data: newUserData,
        });

    } catch (err) {
        console.log("Something went wrong:", err);
        res.status(500).send({ status: false, message: "Something went wrong", error: err.message });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ status: false, message: "Need all fields data" });
        }

        const existingUserData = await userModel.findOne({ email });

        if (!existingUserData) {
            return res.status(404).send({ 
              status: false, 
              message: "Email not found. Please create an account first." 
            });
          }

        const isMatch = await bcryptjs.compare(password, existingUserData.password);
        if (!isMatch) {
            return res.status(401).send({ status: false, message: "Invalid credentials." });
        }

        const token = jsonwebtoken.sign(
            { _id: existingUserData._id, email: existingUserData.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );
          

        res.status(200).send({
            status: true,
            message: "Login successful!",
            token: token,
            data: {
                _id: existingUserData._id,
                name: existingUserData.name,
                email: existingUserData.email,
                
            },
        });

    } catch (err) {
        console.log("Something went wrong:", err);
        res.status(500).send({ status: false, message: "Something went wrong", error: err.message });
    }
};


exports.updateProfile = async (req, res) => {
    try {
        const { name } = req.body; 
        const userId = req.user._id; // Get userId from the token payload

        if (!name) {
            return res.status(400).send({ status: false, message: "Name is required to update" });
        }

        // Find user by userId from the token
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ status: false, message: "User not found" });
        }

        user.name = name; // ⬅️ Only update name

        const updatedUser = await user.save();

        res.status(200).send({
            status: true,
            message: "Name updated successfully",
            data: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email, // just returning email for info (no change)
            },
        });

    } catch (err) {
        console.log("Something went wrong:", err);
        res.status(500).send({ status: false, message: "Something went wrong", error: err.message });
    }
};
