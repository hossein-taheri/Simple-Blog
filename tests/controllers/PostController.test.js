const database = require("../bootstrap/database");
const PostController = require("../../controller/PostController");
const User = require("../../model/User");
const Post = require("../../model/Post");

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

describe("Index method", () => {
    let user;
    let first_post;
    let second_post;
    beforeAll(async () => {
        user = new User({
            first_name: 'test_first_name',
            last_name: 'test_last_name',
            email: 'test_email',
            hash: 'test_hash',
            salt: 'test_salt'
        });
        user = await user.save();
        first_post = new Post({
            user: user._id,
            title: 'first_post_title',
            description: 'first_post_description',
        });
        second_post = new Post({
            user: user._id,
            title: 'second_post_title',
            description: 'second_post_description',
        });
        first_post = await first_post.save();
        second_post = await second_post.save();
    })

    test('should fail if user does not exists', async () => {
        let req = {
            query: {
                page: 1
            },
            user_id: '6108e0c95c7a841b5afc19ed'
        }

        let res = await PostController.index(req, {});

        expect(res.status).toBe(404);
    })
    test("should pass and return user's posts", async () => {
        let req = {
            query: {
                page: 1
            },
            user_id: user._id
        }

        let res = await PostController.index(req, {});

        expect(res.status).toBe(200);
        expect(res.data[0]._id).toEqual(second_post._id);
        expect(res.data[1]._id).toEqual(first_post._id);
    })


    afterAll(async () => {
        await User.deleteMany({})
        await Post.deleteMany({})
    })
})

describe("Show method", () => {
    let user;
    let post;
    beforeAll(async () => {
        user = new User({
            first_name: 'test_first_name',
            last_name: 'test_last_name',
            email: 'test_email',
            hash: 'test_hash',
            salt: 'test_salt'
        });
        user = await user.save();
        post = new Post({
            user: user._id,
            title: 'post_title',
            description: 'post_description',
        });
        post = await post.save();
    })


    test('should fail if post does not exist', async () => {
        let req = {
            params: {
                post: '6108ead204f6732e18cf5237'
            }
        }
        let res = await PostController.show(req, {})

        expect(res.status).toBe(404);

    })
    test('should pass otherwise', async () => {
        let req = {
            params: {
                post: post._id
            }
        }
        let res = await PostController.show(req, {})

        expect(res.status).toBe(200);
    })

    afterAll(async () => {
        await User.deleteMany({})
        await Post.deleteMany({})
    })
})

describe("Store method", () => {
    let user;
    beforeAll(async () => {
        user = new User({
            first_name: 'test_first_name',
            last_name: 'test_last_name',
            email: 'test_email',
            hash: 'test_hash',
            salt: 'test_salt'
        });
        user = await user.save();
    })

    test("should pass if the data is correct", async () => {
        let req = {
            user_id: user._id,
            body: {
                title: 'test_title',
                description: 'test_description',
                images: ['123', '456']
            }
        }
        let res = await PostController.store(req, {})
        let post = await Post.findById(res.data._id);

        expect(res.status).toBe(200);
        expect(post.user).toEqual(req.user_id);
        expect(post.title).toBe(req.body.title);
        expect(post.description).toBe(req.body.description);
        expect(post.images.sort().toString()).toBe(req.body.images.sort().toString());
    })


    afterAll(async () => {
        await User.deleteMany({})
        await Post.deleteMany({})
    })
})

describe("Update method", () => {
    let user;
    let post;
    beforeAll(async () => {
        user = new User({
            first_name: 'test_first_name',
            last_name: 'test_last_name',
            email: 'test_email',
            hash: 'test_hash',
            salt: 'test_salt'
        });
        user = await user.save();
        post = new Post({
            user: user._id,
            title: 'post_title',
            description: 'post_description',
        });
        post = await post.save();
    })

    test("should fail if post does not exist", async () => {
        let req = {
            user_id: user._id,
            params: {
                post: "6108f8ad2e99ef4486674de1"
            }
        }
        let res = await PostController.update(req, {});
        expect(res.status).toBe(404)
    })
    test("should fail if user is not post's author", async () => {
        let req = {
            user_id: "6108f8ad2e99ef4486674de1",
            params: {
                post: post._id
            }
        }
        let res = await PostController.update(req, {});
        expect(res.status).toBe(403)
    })
    test("should pass otherwise", async () => {
        let req = {
            user_id: user._id,
            params: {
                post: post._id
            },
            body: {
                title: 'updated_title',
                description: 'updated_description',
                images: ['456', '654'],
            }
        }
        let res = await PostController.update(req, {});
        expect(res.status).toBe(200)
        expect(res.data.title).toBe(req.body.title)
        expect(res.data.description).toBe(req.body.description)
        expect(res.data.images.sort().toString()).toBe(req.body.images.sort().toString())
    })

    afterAll(async () => {
        await User.deleteMany({})
        await Post.deleteMany({})
    })
})

describe("Destroy method", () => {
    let user;
    let post;
    beforeAll(async () => {
        user = new User({
            first_name: 'test_first_name',
            last_name: 'test_last_name',
            email: 'test_email',
            hash: 'test_hash',
            salt: 'test_salt'
        });
        user = await user.save();
        post = new Post({
            user: user._id,
            title: 'post_title',
            description: 'post_description',
        });
        post = await post.save();
    })


    test("should fail if post does not exist", async () => {
        let req = {
            user_id: user._id,
            params: {
                post: "6108f8ad2e99ef4486674de1"
            }
        }
        let res = await PostController.destroy(req, {});
        expect(res.status).toBe(404)
    })
    test("should fail if user is not post's author", async () => {
        let req = {
            user_id: "6108f8ad2e99ef4486674de1",
            params: {
                post: post._id
            }
        }
        let res = await PostController.destroy(req, {});
        expect(res.status).toBe(403)
    })
    test("should pass otherwise", async () => {
        let req = {
            user_id: user._id,
            params: {
                post: post._id
            }
        }
        let res = await PostController.destroy(req, {});
        expect(res.status).toBe(200)
        let deleted_post = await Post.findOne({_id : req.params.post});
        expect(deleted_post).toBe(null);
    })


    afterAll(async () => {
        await User.deleteMany({})
        await Post.deleteMany({})
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