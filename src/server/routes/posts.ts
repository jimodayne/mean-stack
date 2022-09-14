import express from 'express';
import { Collection, ObjectId } from 'mongodb';
import { isValidId } from '../helper/index';
import { errorRes, successRes } from '../helper/response';
import { getDb } from '../db/conn';

const postRoutes = express.Router();

const getPostsCollection = (): Collection => {
    return getDb().collection('posts');
};

postRoutes.route('/').get(async (req, res) => {
    const collection = getPostsCollection();
    try {
        const estimate = await collection.estimatedDocumentCount();
        const posts = await collection.find({}).limit(20).toArray();
        successRes(res, posts, estimate);
    } catch (err) {
        errorRes(res, err);
    }
});

postRoutes.route('/:id').get(async (req, res) => {
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

export { postRoutes };
