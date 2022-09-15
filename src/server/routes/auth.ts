import express from 'express';
import { Collection } from 'mongodb';
import { IUser } from '../constants/interface';
import { getDb } from '../db/conn';
import { comparePassword, hashPassword } from '../helper/encrypt';
import { errorRes, successRes } from '../helper/response';

const authRoutes = express.Router();
const getUserCollection = (): Collection<IUser> => {
    return getDb().collection<IUser>('users');
};

authRoutes.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const encryptedPassword = await hashPassword(password);

    const collection = getUserCollection();
    try {
        const user = await collection.findOne({ username });
        if (user) return errorRes(res, null, 'User already exists', 400);
        const newUser = await collection.insertOne({ username, password: encryptedPassword });
        successRes(res, newUser, 201);
    } catch (error) {
        errorRes(res, error);
    }
});

authRoutes.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const collection = getUserCollection();
    try {
        const user = await collection.findOne({ username });
        if (!user) return errorRes(res, null, 'Username or password not match', 400);
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return errorRes(res, null, 'Username or password not match', 400);
    } catch (error) {
        errorRes(res, error);
    }

    res.json({ message: 'signin' });
});

authRoutes.post('/refreshtoken', (req, res) => {
    res.json({ message: 'refreshtoken' });
});

export { authRoutes };
