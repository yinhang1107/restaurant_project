import request from 'supertest';
import mongoose from 'mongoose';

import {Post} from '../../../models/post.js'
import {User} from '../../../models/user.js'
import svr from '../../../index.js';

let server;
describe('/api/posts', () => {
    beforeEach(()=> {
        server = svr;
    });

    afterEach(async()=> {
        await Post.remove({});
        server.close();
    });

    describe("GET / ", () => {
        it('should return posts in page 1', async () => {
            await Post.collection.insertMany([
                {title: 'post title 1', description: 'post description 1', selectedFile:'selectedFile'},
                {title: 'post title 2', description: 'post description 2', selectedFile:'selectedFile'},
                {title: 'post title 3', description: 'post description 3', selectedFile:'selectedFile'},
            ]);

            const res = await request(server).get('/api/news?page=1')

            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(2);
            expect(res.body.data.some((p) => p.title === "post title 3")).toBeTruthy();
            expect(res.body.data.some((p) => p.title === "post title 2")).toBeTruthy();
    });
});
    describe("GET /:id", () => {
        it('should return post if valid id is passed', async () => {
            const post = new Post({
                title: 'post title 1', description: 'post description 1',selectedFile:'selectedFile'
            })
            await post.save();

            const res = await request(server).get(`/api/news/${post._id}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("title", post.title);
        })
        it('should return 404 if invalid id is passed', async () => {
            const post = new Post({
                title: 'post title 1', description: 'post description 1',selectedFile:'selectedFile'
            })
            await post.save();

            const res = await request(server).get(`/api/news/1234`);

            expect(res.status).toBe(404);
        });
        it('should return 404 if post with the given id is not found',async () => {
            const id = mongoose.Types.ObjectId().toHexString();

            const post = new Post({
                title: 'post title 1', description: 'post description 1',selectedFile:'selectedFile'
            })
            await post.save();

            const res = await request(server).get(`/api/news/${id}`);

            expect(res.status).toBe(404);
        });
    });
    describe ("POST /", () => {
        let token;
        let title;
        let selectedFile;
        let description;

        const exec = () => {
            return request(server)
                .post(`/api/news`)
                .set('x-auth-token', token)
                .send({title, description, selectedFile})
        };

        beforeEach(() => {
            token = new User({isAdmin: true}).generateAuthToken();
            title = 'post title 1';
            description = 'post description 1';
            selectedFile = 'selectedFile';
        })
        it('should return 401 if user is not logged in', async () => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });
        it('should return 403 if user is not admin', async()=> {
            token = new User().generateAuthToken();

            const res = await exec();

            expect(res.status).toBe(403);
        });
        it('should return 400 if title is less than 3 characters', async () => {
            title = 'ab';

            const res = await exec();
            expect(res.status).toBe(400);
        })
        it('should return 400 if title is more than 100 characters', async () => {
            title = new Array(102).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 if description is less than 3 characters', async () => {
            title = 'ab';

            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 201 if input is valid', async () => {
            const res = await exec();

            expect(res.status).toBe(201);
        });
        it('should return response of post created if input is valid', async () => {
            const res = await exec();

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('title', title);
            expect(res.body).toHaveProperty('description', description);
            expect(res.body).toHaveProperty('selectedFile', selectedFile);
        });
    });

    describe("PUT /", ()=> {
        let token;
        let postId;
        let newTitle;
        let newDescription;
        let selectedFile;

        const exec = () => {
            return request(server)
            .put(`/api/news/${postId}`)
            .set('x-auth-token', token)
            .send({title : newTitle, description: newDescription,selectedFile})
        }

        beforeEach(async() => {
            token = new User().generateAuthToken();
            const post = new Post({title: 'post title 1', description: 'post description 1',selectedFile:'selectedFile'});
            await post.save();

            postId = post._id;
            newTitle = 'new post title';
            newDescription = 'new post description';
            selectedFile = 'selectedFile';
        });

        it('should return 404 if id is invalid', async () => {
            postId = '1234';

            const res = await exec();

            expect(res.status).toBe(404);
        });
        it('should return 401 if user is not logged in', async()=> {
            token='';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 400 if token is invalid', async () => {
            token='1234';

            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 if title is less than 3 characters', async () => {
            newTitle = 'ab';

            const res = await exec();

            expect(res.status).toBe(400)
        });
        it('should return 400 if title is more than 100 characters', async () => {
            newTitle = new Array(102).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 if description is less than 3 characters', async () => {
            newDescription = 'a';

            const res = await exec();

            expect(res.status).toBe(400)
        });
        it('should return 404 if post with the given id is not found', async () => {
            postId = mongoose.Types.ObjectId().toHexString();

            const res = await exec();

            expect(res.status).toBe(404);
        });
        it('should return updated post if input is valid', async () =>{
            await exec();

            const updatedPost = await Post.findById(postId);

            expect(updatedPost.title).toBe(newTitle);
            expect(updatedPost.description).toBe(newDescription);
        });
        it('should return response with updated post if input is valid', async() => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title', newTitle);
            expect(res.body).toHaveProperty('description', newDescription);
            expect(res.body).toHaveProperty('_id', postId.toHexString());
        });
    });
    describe('DELETE /', ()=> {
        let token;
        let postId;

        const exec = () => {
            return request(server)
                .delete(`/api/news/${postId}`)
                .set('x-auth-token', token)
                .send();
        }

        beforeEach(async() => {
            token = new User({isAdmin: true}).generateAuthToken();
            const post = new Post({title: 'post title 1', description: 'post description 1',selectedFile:'selectedFile'});
            await post.save();

            postId = post._id;
        });
        it('should return 404 if id is invalid', async() => {
            postId = '1234';
            
            const res = await exec();

            expect(res.status).toBe(404)
        });
        it('should return 401 if user is not logged in', async() => {
            token = '';

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it('should return 403 if user is not admin', async() => {
            token = new User().generateAuthToken();

            const res = await exec();

            expect(res.status).toBe(403);
        });

        it('should return 200 if user is not admin', async() => {
            token = new User().generateAuthToken();

            const res = await exec();

            expect(res.status).toBe(403);
        });

        it('should return 404 if post with the given id is not found', async() => {
            postId = mongoose.Types.ObjectId().toHexString();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should delete post if id is valid', async() => {
            await exec();

            const deletedPost = await Post.findById(postId);

            expect(deletedPost).toBeNull();
        });

        it('should return response with deleted post if id is valid', async() => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id', postId.toHexString());
        });
    })
})