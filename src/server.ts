import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authorRoutes from './routes/authorRoutes';
import categoryRoutes from './routes/categoryRoutes';
import bookRoutes from './routes/bookRoutes';

dotenv.config();

const app = express();
app.use(bodyParser.json()); 

// Kết nối MongoDB
mongoose.connect(
  process.env.MONGO_URI as string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions
);

// Sử dụng các route riêng cho từng chức năng
app.use('/authors', authorRoutes);
app.use('/categories', categoryRoutes);
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
