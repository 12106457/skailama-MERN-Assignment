const mongoose = require('mongoose'); 
const projectModel = require("../model/projectModel");
const fileModel = require("../model/fileModel");

exports.getFiles = async (req, res) => {
  try {
    
    const { projectId } = req.params; 

    if (!projectId) {
      return res.status(400).send({
        status: false,
        message: "projectId is required"
      });
    }

   
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).send({
        status: false,
        message: "Invalid projectId"
      });
    }

    
    const files = await fileModel.find({ projectId }).exec();

    // if (files.length === 0) {
    //   return res.status(404).send({
    //     status: false,
    //     message: "No files found for the given project"
    //   });
    // }

    
    res.status(200).send({
      status: true,
      message: "Files retrieved successfully",
      data: files
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

exports.sendParticularFile=async(req,res)=>{
 try{

  const { fileId } = req.params;
  if (!fileId) {
    return res.status(400).send({
      status: false,
      message: "fileId is required"
    });
  }
  if (!mongoose.Types.ObjectId.isValid(fileId)) {
    return res.status(400).send({
      status: false,
      message: "Invalid fileId"
    });
  }
  const file = await fileModel.findById(fileId).exec();
  if (!file) {
    return res.status(404).send({
      status: false,
      message: "File not found"
    });
  } 
  res.status(200).send({
    status: true,
    message: "File retrieved successfully",
    data: file
  });
  

 }catch (err) {
    console.log("Something went wrong:", err);
    res.status(500).send({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }

}


exports.uploadfile = async (req, res) => {
  try {
    const { projectId, name, transcript } = req.body;

    if (!projectId || !name) {
      return res.status(400).send({
        status: false,
        message: "projectId and file name are required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).send({
        status: false,
        message: "Invalid projectId"
      });
    }

    const newFile = await fileModel.create({ name, transcript, projectId });
    if (!newFile) {
      return res.status(500).send({
        status: false,
        message: "Failed to create file"
      });
    }

    await projectModel.updateOne(
      { _id: projectId },
      { $push: { files: newFile._id } }
    );

    res.status(200).send({
      status: true,
      message: "File uploaded and linked to project",
      data: newFile
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

exports.editFile = async (req, res) => {
    try {
      const { fileId, transcript } = req.body;
  
      if (!fileId || !transcript) {
        return res.status(400).send({
          status: false,
          message: "fileId and transcript are required",
        });
      }
  
      if (!mongoose.Types.ObjectId.isValid(fileId)) {
        return res.status(400).send({
          status: false,
          message: "Invalid fileId",
        });
      }
  
      const updatedFile = await fileModel.findByIdAndUpdate(
        fileId,
        { transcript },
        { new: true }
      );
  
      if (!updatedFile) {
        return res.status(404).send({
          status: false,
          message: "File not found",
        });
      }
  
      
      await projectModel.updateOne(
        { files: fileId },
        { $set: { updatedAt: new Date() } }
      );
  
      res.status(200).send({
        status: true,
        message: "File updated successfully",
        data: updatedFile,
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


  exports.deleteFile = async (req, res) => {
    try {
      const { fileId } = req.body;
  
      if (!fileId) {
        return res.status(400).send({
          status: false,
          message: "fileId is required",
        });
      }
  
      if (!mongoose.Types.ObjectId.isValid(fileId)) {
        return res.status(400).send({
          status: false,
          message: "Invalid fileId",
        });
      }
  
      
      const deletedFile = await fileModel.findByIdAndDelete(fileId);
  
      if (!deletedFile) {
        return res.status(404).send({
          status: false,
          message: "File not found",
        });
      }
  
      
      await projectModel.updateOne(
        { files: fileId },
        {
          $pull: { files: fileId },
          $set: { updatedAt: new Date() }
        }
      );
  
      res.status(200).send({
        status: true,
        message: "File deleted successfully",
        data: deletedFile,
      });
  
    } catch (err) {
      console.error("Error while deleting file:", err);
      res.status(500).send({
        status: false,
        message: "Something went wrong",
        error: err.message,
      });
    }
  };