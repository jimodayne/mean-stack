import express from 'express';
import 'dotenv/config';
import { postRoutes } from './server/routes/posts';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});

app.use('/posts', postRoutes);
