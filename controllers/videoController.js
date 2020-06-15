import routes from "../routes";
import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

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

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload" });
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
        description,
        creator: req.user.id
    });
    // console.log(newVideo);

    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    const {
      params: { id },
      user
    } = req;
    try {
      const video = await Video.findById(id)
        .populate("creator")
        .populate("comments");
      res.render("videoDetail", { pageTitle: video.title, video, user });
      console.log(video);
    } catch (error) {
      res.redirect(routes.home);
    }
};

export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const video = await Video.findById(id);
        if(String(video.creator) !== req.user.id) {
            throw Error();
        } else {
            res.render("editVideo", {pageTitle: `Edit ${video.title}`, video});
        }
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: {
            title,
            description
        }
    } = req;

    try {
        const video = await Video.findById(id);
        if(String(video.creator) !== req.user.id) {
            throw Error();
        } else {
            await Video.findOneAndUpdate({_id:id}, {title,description});
        }
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const deleteVideo = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const video = await Video.findById(id);
        if(String(video.creator) !== req.user.id) {
            throw Error();
        } else {
            await Video.findOneAndRemove({_id:id});
        }
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const postRegisterView = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};

export const getComments = async (req, res) => {
    const {
      params: { id },
      user
    } = req;
    let comments = null;
    try {
      const video = await Video.findById(id)
      .populate({
        path: "comment",
        populate: {
          model: "User",
          path: "creator"
        }
      })
      .populate({
        path: "comments",
        populate: {
          model: "Comment",
          path: "reComment",
          populate: {
            model: "User",
            path: "creator"
          }
        }
      });
    //   console.log(video);
      comments = video.comments;
    } catch (error) {
      res.status(400);
    } finally {
      res.json(comments.reverse());
    }
  };

//Add Comment
export const postAddComment = async (req, res) => {
    const {
        params: { id },
        body: { comment },
        user
    } = req;
    try {
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: user.id,
            avatarUrl: user.avatarUrl,
            name: user.name
        });
        video.comments.push(newComment._id);
        video.save();
        res.send({commentData:newComment});
        // console.log(video);
        // console.log("newComment", newComment);
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};

export const postDeleteComment = async (req, res) => {
    const {
      params: { id },
      user
    } = req;
    try {
      const comment = await Comment.findById(id);
      if (String(comment.creator) !== user.id) {
        throw Error();
      } else {
        await Comment.findOneAndRemove({ _id: id });
      }
    } catch (error) {
      console.log(error);
      res.status(400);
    } finally {
      res.end();
    }
  };