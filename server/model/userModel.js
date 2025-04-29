const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  password:{type:String,require:true},
  image: { type: String, default: null },
 
}, { timestamps: true });




module.exports = mongoose.model("user", customerSchema);
