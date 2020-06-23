import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
    region: "ap-northeast-1"
});

// const multerVideo = multer({dest: "uploads/videos/"});
// const multerAvatar = multer({dest: "uploads/avatars/"});

const multerVideo = multer({
    storage: multerS3({
        S3,
        acl: "public-read",
        bucket: "nodetube/video"

    })
});

const multerAvatar = multer({
    storage: multerS3({
        S3,
        acl: "public-read",
        bucket: "nodetube/avatar"
    })
});

// .single() is that uploading only one file.
// 'videoFile' is name of HTML form tag.
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "NodeJs Yuna Lee";
    res.locals.routes = routes;
    // res.locals.user = req.user || null;
    res.locals.loggedUser = req.user || null;
    res.locals.dateFormatter = dateFormatter;
    // console.log(req.user);
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
        res.redirect(routes.login);
    }
};

//date formatter
export const dateFormatter = dateStr => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}.${
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        }`;
};