export interface ResponseData<T> {
    msg: string;
    code: number;
    data: T;
    total?: number;
}
