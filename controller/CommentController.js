const ApiResponse = require("../helpers/responses/ApiResponse");
const Post = require("../model/Post");
const Comment = require("../model/Comment");

const CommentController = {
    store: async (req, res) => {
        try {
            let post = await Post
                .findOne({
                    _id: req.params.post
                })

            if (!post) {
                return ApiResponse
                    .error(
                        req,
                        res,
                        404,
                        "Post not found"
                    );
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
                    null
                );

        } catch (err) {
            return ApiResponse
                .serverError(
                    req,
                    res,
                    err
                );
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
                return ApiResponse
                    .error(
                        req,
                        res,
                        404,
                        "Comment not found"
                    );
            }

            if (comment.user.toString() !== req.user_id.toString()) {
                return ApiResponse
                    .error(
                        req,
                        res,
                        403,
                        "Access denied"
                    );
            }

            if (comment.post._id.toString() !== req.params.post.toString()) {
                return ApiResponse
                    .error(
                        req,
                        res,
                        406,
                        "Comment and post do not match"
                    );
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
                .serverError(
                    req,
                    res,
                    err
                );
        }
    }
}
module.exports = CommentController;