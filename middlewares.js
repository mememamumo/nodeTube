import routes from "./routes";
import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "NodeJs Yuna Lee";
    res.locals.routes = routes;
    // res.locals.user = req.user || null;
    res.locals.loggedUser = req.user || null;
    // test
    console.log(req.user);
    next();
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
};

const multerVideo = multer({dest: "upload/videos/"});
const multerAvatar = multer({dest: "upload/avatars/"});
// .single() is that uploading only one file.
// 'videoFile' is name of HTML form tag.
export const uploadVideo = multerVideo.single("videoFile");

export const uploadAvatar = multerAvatar.single("avatar");