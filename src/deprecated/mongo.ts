import 'dotenv/config';
import { MongoClient } from 'mongodb';
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

interface Food {
    name: string;
    healthy: boolean;
}

// const foodArr: Food[] = [
//     { name: 'cake', healthy: false },
//     { name: 'lettuce', healthy: true },
//     { name: 'donut', healthy: false },
// ];

async function initalizeMongo() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        await main();
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

initalizeMongo().catch(console.dir);

const main = async () => {
    const db = await client.db('test');
    const movies = db.collection('movies');

    // Get the film Titanic
    const tinatic = await movies.findOne(
        { title: 'Titanic' },
        { projection: { _id: 0, title: 1, year: 1, languages: 1 } },
    );
    console.log('movies titanic >> ', tinatic);

    const foods = db.collection<Food>('foods');
    // const result = await foods.insertMany(foodArr);
    // console.log(`${result.insertedCount} documents were inserted`, result);

    // Get the healthy food
    const healthyFood = await foods.find({ healthy: true }).toArray();
    console.log('healthy food >> ', healthyFood);
};
