import 'dotenv/config';
import { Db, MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI as string;

const client = new MongoClient(uri);
let dbConnection: Db;

async function initalizeMongo() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        const db = await client.connect();
        dbConnection = await db.db('database');
        console.log('Successfully connected to MongoDB.');
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

initalizeMongo().catch(console.dir);

export const getDb = () => {
    return dbConnection;
};
