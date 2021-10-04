const User = require("../model/User");
const Post = require("../model/Post");
const Comment = require("../model/Comment");
const ApiResponse = require("../helpers/responses/ApiResponse");
const PostController = {
    index: async (req, res, next) => {
        try {
            let page = req.query.page;
            if (!page) {
                page = 1;
            }

            let user = await User
                .findOne({
                    _id: req.user_id
                })

            if (!user) {
                return ApiResponse
                    .error(
                        req,
                        res,
                        404,
                        "User not found"
                    )
            }


            let posts = await Post
                .find({
                        user: user._id
                    },
                    {},
                    {
                        skip: ((page - 1) * 20),
                        limit: 20,
                        sort: {
                            createdAt: -1
                        }
                    }
                )
                .populate({
                    path: 'user',
                    select: [
                        'first_name',
                        'last_name'
                    ]
                })
                .lean()

            return ApiResponse
                .message(
                    req,
                    res,
                    null,
                    posts
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
    show: async (req, res, next) => {
        try {
            let post = await Post
                .findOne({
                    _id: req.params.post
                })
                .populate(
                    'user',
                    [
                        'first_name',
                        'last_name'
                    ]
                )
                .lean()

            if (!post) {
                return ApiResponse
                    .error(
                        req,
                        res,
                        404,
                        'Post not found'
                    )
            }

            post.comments = await Comment
                .find({
                        post: post._id
                    },
                    {},
                    {
                        sort: {
                            createdAt: -1
                        }
                    }
                )
                .populate({
                    path: 'user',
                    select: [
                        'first_name',
                        'last_name'
                    ]
                })


            return ApiResponse
                .message(
                    req,
                    res,
                    null,
                    post
                )

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
    store: async (req, res, next) => {
        try {
            let images = [];

            if (req.body.images) {
                images = req.body.images;
            }

            let post = new Post({
                user: req.user_id,
                title: req.body.title,
                description: req.body.description,
                images: images,
            });

            post = await post.save()

            return ApiResponse
                .message(
                    req,
                    res,
                    "Post created successfully",
                    post
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
    update: async (req, res, next) => {
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
                        'Post not found'
                    )
            }

            if (post.user.toString() !== req.user_id.toString()) {
                return ApiResponse
                    .error(
                        req,
                        res,
                        403,
                        "Access denied"
                    )
            }

            let properties = [
                'title',
                'description',
                'images',
            ];

            properties.forEach(property => {
                if (req.body[property]) {
                    post[property] = req.body[property];
                }
            })

            post = await post.save()

            return ApiResponse
                .message(
                    req,
                    res,
                    "Post updated successfully",
                    post
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
    destroy: async (req, res, next) => {
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
                        'Post not found'
                    )
            }

            if (post.user.toString() !== req.user_id.toString()) {
                return ApiResponse
                    .error(
                        req,
                        res,
                        403,
                        "Access denied"
                    )
            }

            await post.delete()

            return ApiResponse
                .message(
                    req,
                    res,
                    "Post deleted successfully",
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
    },
}
module.exports = PostController