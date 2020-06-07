import express from "express";
import routes from "../routes";
import { 
    postRegisterView, 
    postAddComment,
    getComments,
    postLatestComment,
    postDeleteComment
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.get(routes.addComment, getComments);
// apiRouter.post(routes.latestComment, postLatestComment);
// apiRouter.post(routes.deleteComment, postDeleteComment);

export default apiRouter;