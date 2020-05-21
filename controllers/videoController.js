import routes from "../routes";
import Video from "../models/Video";

// export const home = (req, res) => {
//     res.render("home", {pageTitle: "Home", videos});
//     console.log(videos);
// };

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({_id:-1});
        // console.log(videos);
        res.render("home", {pageTitle: "Home", videos})
    } catch (error) {
        console.log(error);
        res.render("home", {pageTitle: "Home", videos: []});
    }
};

export const search = async (req, res) => {
    const {
        query: { term: searchingBy }
    } = req;

    let videos = [];

    try {
        videos = await Video.find({title:{$regex: searchingBy, $options: "i"}});
    } catch (error) {
        console.log(error);
    }  
    res.render("search", { pageTitle: "Search", searchingBy, videos});
};

export const videoDetail = async (req, res) => {
    // res.render("videoDetail", { pageTitle: video.title, video });
    console.log(req.params);
    const {
        params: { id }
    } = req;

    try {
        // .findById() 는 mongoose의 Querys 중 하나
        const video = await Video.findById(id);
        console.log(video);
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const getUpload = (req, res) => {
    res.render("upload", {pageTitle: "Upload"});
};

export const postUpload = async (req, res) => {
    const {
        body: {
            title,
            description
        },
        file: { path }
    } = req;
    
    // .create(): 생성 , .find(): 찾기
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });

    console.log(newVideo);
    // 임시로 막아두고, console.log test
    // console - originalname, encoding, mimetype, description, filename, *path, size 를 확인 할 수 있음.
    res.redirect(routes.videoDetail(newVideo.id));
};

export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const video = await Video.findById(id);
        res.render("editVideo", {pageTitle: `Edit ${video.title}`, video});
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const postEditVideo = async (req, res) => {
    const {
        parmas: { id },
        body: {
            title,
            description
        }
    } = req;

    try {
        await Video.findOneAndUpdate({_id:id}, {title,description});
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const deleteVideo = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        await Video.findOneAndRemove({_id:id});
    } catch (error) {
        res.redirect(routes.home);
    }
};
