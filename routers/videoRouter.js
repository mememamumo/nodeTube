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
} from "../controllers/videoController"

const videoRouter = express.Router();

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);
// deleteVideo를 String을 return하는 function으로 하기 위해 () 추가
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;