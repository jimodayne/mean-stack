import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { postRoutes } from './server/routes/posts';
import { authRoutes } from './server/routes/auth';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
