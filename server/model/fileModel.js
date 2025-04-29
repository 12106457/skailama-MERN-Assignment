const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  projectId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  transcript: {
    type: String,
    required: true,
  }
}, { timestamps: true }); // optional, if you want createdAt, updatedAt

module.exports = mongoose.model('File', fileSchema);
