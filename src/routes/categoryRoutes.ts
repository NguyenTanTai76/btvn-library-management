import express from 'express';
import Category from '../models/Category';

const router = express.Router();

// Lấy danh sách thể loại
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách thể loại', error });
  }
});

// Thêm một thể loại mới
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm thể loại', error });
  }
});

export default router;
