import express from "express";
import routes from "../routes";
import { uploadVideo } from "../middlewares";
import { 
    videoDetail,
    getUpload,
    postUpload,
    getEditVideo,
    postEditVideo,
    deleteVideo
} from "../controllers/videoController";
import { onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);
// deleteVideo를 String을 return하는 function으로 하기 위해 () 추가
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;