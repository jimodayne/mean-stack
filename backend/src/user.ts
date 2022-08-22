import { v4 as uuidv4 } from 'uuid';

interface IUser {
    id: string;
    name: string;
    age: number;
}

const person: IUser = {
    id: uuidv4(),
    name: 'John Doe',
    age: 25,
};

export { person };
