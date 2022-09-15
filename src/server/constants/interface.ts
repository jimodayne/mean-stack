import { ObjectId } from 'mongodb';

export interface ResponseData<T> {
    msg: string;
    code: number;
    data: T;
    total?: number;
}

export interface IPostDetail {
    _id?: ObjectId;
    title: string;
    content: string;
    description: string;
}

export interface IUser {
    _id?: ObjectId;
    username: string;
    password: string;
}
