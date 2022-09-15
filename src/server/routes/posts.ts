import express from 'express';
import { Collection, ObjectId } from 'mongodb';
import { isValidId } from '../helper/index';
import { errorRes, successRes } from '../helper/response';
import { getDb } from '../db/conn';
import { IPostDetail } from '../constants/interface';

const postRoutes = express.Router();

const getPostsCollection = (): Collection<IPostDetail> => {
    return getDb().collection<IPostDetail>('posts');
};

postRoutes.get('/', async (req, res) => {
    const collection = getPostsCollection();
    try {
        const estimate = await collection.estimatedDocumentCount();
        const posts = await collection.find({}).project({ title: 1, description: 1 }).limit(20).toArray();
        successRes(res, posts, 200, estimate);
    } catch (err) {
        errorRes(res, err);
    }
});

postRoutes.get('/:id', async (req, res) => {
    if (!isValidId(req.params.id)) return errorRes(res, null, 'Incorrect id', 400);
    const collection = getPostsCollection();

    try {
        const objectId = new ObjectId(req.params.id);
        const post = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!post) throw new Error('Post not found');
        successRes(res, { ...post, createdDate: objectId.getTimestamp() });
    } catch (err) {
        errorRes(res, err);
    }
});

postRoutes.post('/', async (req, res) => {
    const collection = getPostsCollection();
    try {
        const { title, content, description } = req.body as IPostDetail;
        const newPost = await collection.insertOne({ title, content, description });
        successRes(res, newPost, 201);
    } catch (err) {
        errorRes(res, err);
    }
});

postRoutes.put('/:id', async (req, res) => {
    if (!isValidId(req.params.id)) return errorRes(res, null, 'Incorrect id', 400);
    const collection = getPostsCollection();

    try {
        const { title, content, description } = req.body as IPostDetail;
        const updatedPost: IPostDetail = { title, content, description };

        const post = await collection.findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: updatedPost as any },
            { returnDocument: 'after' },
        );
        if (!post) throw new Error('Post not found');
        successRes(res, post);
    } catch (err) {
        errorRes(res, err);
    }
});

postRoutes.delete('/:id', async (req, res) => {
    if (!isValidId(req.params.id)) return errorRes(res, null, 'Incorrect id', 400);
    const collection = getPostsCollection();
    try {
        const post = await collection.findOneAndDelete({ _id: new ObjectId(req.params.id) });
        if (!post) throw new Error('Post not found');
        successRes(res, null);
    } catch (err) {
        errorRes(res, err);
    }
});

export { postRoutes };
