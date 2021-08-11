const database = require("../bootstrap/test_database_connection");
const User = require("../../model/User");
const Post = require("../../model/Post");
const HomeController = require("../../controller/HomeController");

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
    let posts = [];
    beforeAll(async () => {
        user = new User({
            first_name: 'test_first_name',
            last_name: 'test_last_name',
            email: 'test_email',
            hash: 'test_hash',
            salt: 'test_salt'
        });
        user = await user.save();
        for (let i = 0; i < 24; i++) {
            posts.push(new Post({
                user: user._id,
                title: 'post_title',
                description: 'post_description',
            }));
            posts[i] = await posts[i].save()
        }
    })

    test('should pass and return first 20 posts in page 1', async () => {
        let req = {
            query: {}
        };
        let res = await HomeController.index(req, {});

        expect(res.status).toBe(200);
        expect(res.data[0].user.first_name).toBe(user.first_name);
        expect(res.data[0].user.last_name).toBe(user.last_name);
        let slicedPosts = await Post.find({},
            {},
            {
                skip: 0,
                limit: 20,
                sort: {
                    createdAt: -1
                }
            }
        )
        let slicedPostsIds = [];
        let expectedPostsIds = [];
        slicedPosts.forEach(post => {
            slicedPostsIds.push(post._id);
        })
        res.data.forEach(post => {
            expectedPostsIds.push(post._id);
        })
        expect(slicedPostsIds.sort().toString()).toBe(expectedPostsIds.sort().toString())
    })

    test('should pass and return other 4 posts in page 2', async () => {
        let req = {
            query: {
                page: 2
            }
        };
        let res = await HomeController.index(req, {});

        expect(res.status).toBe(200);
        expect(res.data[0].user.first_name).toBe(user.first_name);
        expect(res.data[0].user.last_name).toBe(user.last_name);
        let slicedPosts = await Post.find({},
            {},
            {
                skip: 20,
                limit: 20,
                sort: {
                    createdAt: -1
                }
            }
        )
        let slicedPostsIds = [];
        let expectedPostsIds = [];
        slicedPosts.forEach(post => {
            slicedPostsIds.push(post._id);
        })
        res.data.forEach(post => {
            expectedPostsIds.push(post._id);
        })
        expect(slicedPostsIds.sort().toString()).toBe(expectedPostsIds.sort().toString())
    })

    test('should fail if page has not entered correctly', async () => {
        let req = {
            query: {
                page: "ABC"
            }
        };

        let res = await HomeController.index(req, {});

        expect(res.status).toBe(500);
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