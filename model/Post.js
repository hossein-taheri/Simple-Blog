const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        images: [{
            type: String,
        }],
        commentsNumber: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    {timestamps: true}
);
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;