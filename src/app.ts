import express from 'express';
import connectDB from './config/db';
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';
import categoryRoutes from './routes/categoryRoutes';

connectDB();

const app = express();
app.use(express.json());

app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);
app.use('/categories', categoryRoutes);

export default app;
