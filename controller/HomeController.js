const Post = require("../model/Post");
const ApiResponse = require("../helpers/responses/ApiResponse");
const HomeController = {
    index: async (req, res) => {
        try {
            let page = req.query.page;
            if (!page) {
                page = 1;
            }
            if (!Number.isInteger(page)) {
                throw new Error('Page must be integer');
            }

            let posts = await Post
                .find({},
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
                .serverError(
                    req,
                    res,
                    err
                );
        }
    }

}
module.exports = HomeController;