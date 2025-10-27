import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: { type: String, required: true },
    content: { type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
});

const Post = mongoose.model('Post', postSchema);
export default Post;