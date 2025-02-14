import { Request, Response } from 'express';
import { Category } from '../models/Category';

// Lấy danh sách thể loại
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách thể loại', error });
  }
};

// Thêm một thể loại mới
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm thể loại', error });
  }
};
