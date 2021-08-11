const CommentController = require('../../controller/CommentController');
const database = require("../bootstrap/test_database_connection");
const Post = require("../../model/Post");
const User = require("../../model/User");
const Comment = require("../../model/Comment");


beforeAll((done) => {
    database
        .connect()
        .then(() => {
            console.log("Successfully connected to MongoDB.")
            done()
        })
        .catch(err => {
            console.log("Connection error")
            done()
        })
})


describe("Store method", () => {
    let first_user;
    let second_user;
    let post;
    beforeAll(async () => {
        first_user = new User({
            first_name: 'test_first_first_name',
            last_name: 'test_first_last_name',
            email: 'test_first_email',
            hash: 'test_first_hash',
            salt: 'test_first_salt'
        });
        first_user = await first_user.save();
        second_user = new User({
            first_name: 'test_second_first_name',
            last_name: 'test_second_last_name',
            email: 'test_second_email',
            hash: 'test_second_hash',
            salt: 'test_second_salt'
        });
        second_user = await second_user.save();
        post = new Post({
            user: first_user._id,
            title: 'post_title',
            description: 'post_description',
        });
        post = await post.save()
    })

    test('should fail if data has not entered at all', async () => {
        let req = {}

        let res = await CommentController.store(req, {});

        expect(res.status).toBe(500)
    })

    test('should fail if it write comment on a post that does not exist', async () => {
        let req = {
            user_id: second_user._id,
            params: {
                post: '61092ed9e2217127efa2a6e1',
            },
            body: {
                body: 'test_comment',
            }
        }
        let res = await CommentController.store(req, {});

        expect(res.status).toBe(404)
    })

    test('should pass if write comment and check comment and post comment numbers', async () => {
        let req = {
            user_id: second_user._id,
            params: {
                post: post._id,
            },
            body: {
                body: 'test_comment',
            }
        }
        let beforeCommentsNumbers = (await Post.findOne(post._id)).commentsNumber;
        let res = await CommentController.store(req, {});
        let afterCommentsNumbers = (await Post.findOne(post._id)).commentsNumber;
        expect(res.status).toBe(200);
        expect(res.data.body).toBe(req.body.body);
        expect(afterCommentsNumbers - beforeCommentsNumbers).toBe(1);
    })

    afterAll(async () => {
        await User.deleteMany({})
        await Post.deleteMany({})
        await Comment.deleteMany({})
    })
})

describe("Destroy method", () => {
    let first_user;
    let second_user;
    let post;
    let comment;
    beforeAll(async () => {
        first_user = new User({
            first_name: 'test_first_first_name',
            last_name: 'test_first_last_name',
            email: 'test_first_email',
            hash: 'test_first_hash',
            salt: 'test_first_salt'
        });
        first_user = await first_user.save();
        second_user = new User({
            first_name: 'test_second_first_name',
            last_name: 'test_second_last_name',
            email: 'test_second_email',
            hash: 'test_second_hash',
            salt: 'test_second_salt'
        });
        second_user = await second_user.save();
        post = new Post({
            user: first_user._id,
            title: 'post_title',
            description: 'post_description',
        });
        post = await post.save();
        comment = new Comment({
            user: second_user._id,
            post: post._id,
            body: 'test_comment',
        });
        comment = await comment.save();
    })

    test("should fail if data has not entered at all", async () => {
        let req = {}

        let res = await CommentController.destroy(req, {});
        
        expect(res.status).toBe(500)
    })

    test("should fail if delete a comment that does not exist", async () => {
        let req = {
            user_id: second_user._id,
            params: {
                comment: '61092ed9e2217127efa2a6e1',
                post: post._id,
            }
        }
        let res = await CommentController.destroy(req, {});
        expect(res.status).toBe(404)
    })

    test("should fail if delete a comment that does not belong to user", async () => {
        let req = {
            user_id: first_user._id,
            params: {
                comment: comment._id,
                post: post._id,
            }
        }
        let res = await CommentController.destroy(req, {});
        expect(res.status).toBe(403)
    })

    test("should fail if delete a comment with another post id", async () => {
        let req = {
            user_id: second_user._id,
            params: {
                comment: comment._id,
                post: '61092ed9e2217127efa2a6e1',
            }
        }
        let res = await CommentController.destroy(req, {});
        expect(res.status).toBe(406)
    })

    test("should fail if delete a comment and check comment and post comment numbers", async () => {
        let req = {
            user_id: second_user._id,
            params: {
                comment: comment._id,
                post: post._id,
            }
        }
        let beforeCommentsNumbers = (await Post.findOne(post._id)).commentsNumber;
        let res = await CommentController.destroy(req, {});
        let afterCommentsNumbers = (await Post.findOne(post._id)).commentsNumber;
        expect(res.status).toBe(200)
        expect(afterCommentsNumbers - beforeCommentsNumbers).toBe(-1);
        expect(await Comment.findOne(comment._id)).toBe(null);
    })
})


afterAll((done) => {
    database
        .disconnect()
        .then(() => {
            done()
        })
        .catch(err => {
            console.log(err);
            done()
        })
})