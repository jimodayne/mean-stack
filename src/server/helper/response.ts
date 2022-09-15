import { Response } from 'express';
import { ResponseData } from '../constants/interface';

function successRes<T>(res: Response, data: T, statusCode = 200, total?: number) {
    const response: ResponseData<T> = {
        code: statusCode,
        data,
        msg: 'success',
    };
    if (Number.isInteger(total)) {
        response.total = total;
    }
    return res.status(statusCode).json(response);
}

function errorRes(res: Response, err, errMsg = 'Something went wrong', statusCode = 500) {
    if (err) {
        console.error('ERROR:', err);
    }

    return res.status(statusCode).json({ error: errMsg, code: statusCode });
}

export { successRes, errorRes };
