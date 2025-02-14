import express from 'express';
import Book from '../models/Book';
import Author from '../models/Author';
import Category from '../models/Category';

const router = express.Router();

// Lấy danh sách tất cả sách
router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
      .populate('author', 'name birthdate')
      .populate('category', 'name');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sách', error });
  }
});

// Thêm một sách mới
router.post('/', async (req, res) => {
  try {
    const { title, author, category, publishedDate } = req.body;

    const authorExists = await Author.findById(author);
    const categoryExists = await Category.findById(category);
    if (!authorExists || !categoryExists) {
      return res
        .status(400)
        .json({ message: 'Tác giả hoặc thể loại không tồn tại' });
    }

    const newBook = new Book({ title, author, category, publishedDate });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm sách', error });
  }
});

// Tìm kiếm sách theo tiêu đề

export default router;
