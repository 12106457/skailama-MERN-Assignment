const express = require("express");
const {deleteFile,editFile,uploadfile,getFiles,sendParticularFile} = require("../controller/fileController");
const router = express.Router();

const middleware=require("../middleware/verifyToken");

router.use(middleware);

router.get("/get-all-files/:projectId", getFiles);

router.get("/get-file/:fileId", sendParticularFile);

router.post("/upload", uploadfile);

router.put("/update", editFile);

router.delete("/delete", deleteFile);



module.exports = router;