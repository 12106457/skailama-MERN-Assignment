const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  files: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'File',
    default: [],
  },
  image: {
    type: String,
    default: null,
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
