import routes from "./routes";
import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "NodeJs Yuna Lee";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: false,
        id: 1
    }
    next();
};

const multerVideo = multer({dest: "upload/videos/"});
// .single() is that uploading only one file.
// 'videoFile' is name of HTML form tag.
export const uploadVideo = multerVideo.single("videoFile");