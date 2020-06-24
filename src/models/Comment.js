import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    name: String,
    avatarUrl: String,
    text: {
        type: String,
        required: "File URL is required"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // video: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "video"
    // },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const model = mongoose.model("Comment", CommentSchema);
export default model;