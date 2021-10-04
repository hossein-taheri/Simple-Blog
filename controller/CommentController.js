const ApiResponse = require("../helpers/responses/ApiResponse");
const Post = require("../model/Post");
const Comment = require("../model/Comment");
const {NotAcceptable} = require("../helpers/CustomErrors");
const {Forbidden} = require("../helpers/CustomErrors");
const {NotFound} = require("../helpers/CustomErrors");

const CommentController = {
    store: async (req, res) => {
        try {
            let post = await Post
                .findOne({
                    _id: req.params.post
                })

            if (!post) {
                throw new NotFound("Post not found")
            }

            let comment = new Comment({
                user: req.user_id,
                post: req.params.post,
                body: req.body.body,
            });

            await comment.save()

            post.commentsNumber++;

            await post.save()

            return ApiResponse
                .message(
                    req,
                    res,
                    "Comment created successfully",
                    comment
                );
        } catch (err) {
            return ApiResponse
                .error(
                    req,
                    res,
                    err.code || 500,
                    err.message
                )
        }
    },
    destroy: async (req, res) => {
        try {
            let comment = await Comment
                .findOne({
                    _id: req.params.comment
                })
                .populate('post')

            if (!comment) {
                throw new NotFound("Comment not found")
            }

            if (comment.user.toString() !== req.user_id.toString()) {
                throw new Forbidden("Access denied")
            }

            if (comment.post._id.toString() !== req.params.post.toString()) {
                throw new NotAcceptable("Comment and post do not match")
            }

            comment.post.commentsNumber--;

            await comment.post.save()


            await comment.delete()


            return ApiResponse
                .message(
                    req,
                    res,
                    "Comment deleted successfully",
                    null
                );
        } catch (err) {
            return ApiResponse
                .error(
                    req,
                    res,
                    err.code || 500,
                    err.message
                )
        }
    }
}
module.exports = CommentController;