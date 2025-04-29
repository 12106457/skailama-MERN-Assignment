const mongoose = require('mongoose'); 
const projectModel = require("../model/projectModel");

exports.createProject = async (req, res) => {
  try {
    const { userId, projectName, files, image } = req.body;

    if (!userId || !projectName) {
      return res.status(400).send({
        status: false,
        message: "userId and projectName are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ status: false, message: "Invalid userId" });
    }

    const newProject = await projectModel.create({
      userId,
      projectName,
      files: files || [],
      image: image || null,
    });

    res.status(201).send({
      status: true,
      message: "New project created",
      data: newProject,
    });

  } catch (err) {
    console.log("Something went wrong:", err);
    res.status(500).send({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};


exports.getUserProjects = async (req, res) => {
  try {
   
    const { userId } = req.params;

    
    if (!userId) {
      return res.status(400).send({
        status: false,
        message: 'userId is required',
      });
    }

    // Fetch projects based on userId
    const projects = await projectModel.find({ userId: userId })

    // if (projects.length === 0) {
    //   return res.status(404).send({
    //     status: false,
    //     message: 'No projects found for this user',
    //   });
    // }

    res.status(200).send({
      status: true,
      message: 'Projects fetched successfully',
      data: projects,
    });

  } catch (err) {
    console.log('Something went wrong:', err);
    res.status(500).send({
      status: false,
      message: 'Something went wrong while fetching projects',
      error: err.message,
    });
  }
};



