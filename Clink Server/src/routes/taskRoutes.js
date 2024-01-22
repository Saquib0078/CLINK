const express = require('express');
const {getTask,CreateTask,updateTask} = require("../controllers/Task/taskController");
const router = express.Router();
const multer = require("multer");
const {taskPath} = require("../managers/fileManager");
const {generateRandomID} = require("../helpers/appHelper");
const{getTaskImage,completedTask,getCompletedUSers,commentTask,replyCommentTask,deleteCommentTask,getTaskCommentReplies,getTaskComments}=require('../controllers/Task/taskController')
const fs = require('fs');
const { route } = require('./mediaRoutes');
const {verifyJwt, verifyJwtUnSession} = require("../middleware/jwtAuthMiddleware");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, taskPath + "/");
    }, filename: (req, file, cb) => {
        let tempFilename = file.originalname;
        let id = generateRandomID();
        let type = tempFilename.substring(tempFilename.lastIndexOf(".") + 1);
        let filename = id + "." + type;
        req.body.id = id;
        req.body.type = type;
        req.body.filename = filename;
        cb(null, filename);
    },
});

const upload = multer({storage: storage});

router.post("/task",upload.single('imageID'),verifyJwt, CreateTask);
router.get("/getTask",getTask );
// router.put('/updateMeet/:id',updateMeet)
router.get("/getTask/:broadcastMediaID", getTaskImage);
router.put('/tasks/:taskId/complete',completedTask)
router.get('/tasks/:taskId',getCompletedUSers)
// router.get("/joinmeeting/", joinmeeting);


router.post("/controllers/getTaskComments/:taskID/:skip", verifyJwt, getTaskComments);
router.post("/controllers/getTaskCommentReplies/:taskID/:commentID/:skip", verifyJwt, getTaskCommentReplies);
router.post("/controllers/commentTask",verifyJwt, commentTask);
router.post("/controllers/replyCommentTask",verifyJwt, replyCommentTask);
router.post("/controllers/deleteCommentTask/:taskID/:commentID",verifyJwt,deleteCommentTask);




module.exports = router;