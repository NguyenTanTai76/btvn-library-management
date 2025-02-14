import express from 'express';
import Author from '../models/Author';

const router = express.Router();

// Lấy danh sách tác giả
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách tác giả', error });
  }
});

// Thêm một tác giả mới
router.post('/', async (req, res) => {
  try {
    const { name, birthdate } = req.body;
    const newAuthor = new Author({ name, birthdate });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm tác giả', error });
  }
});

export default router;
