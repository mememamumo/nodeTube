import express from "express";
import routes from "../routes";
import { 
    videoDetail,
    getUpload,
    postUpload,
    getEditVideo,
    postEditVideo,
    deleteVideo
} from "../controllers/videoController";
import { onlyPrivate, uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit Video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

// Delete Video
// deleteVideo를 String을 return하는 function으로 하기 위해 () 추가
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;