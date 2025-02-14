import { Request, Response } from 'express';
import { Author } from '../models/Author';

// Lấy danh sách tất cả tác giả
export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách tác giả', error });
  }
};

// Thêm một tác giả mới
export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, birthdate } = req.body;
    const newAuthor = new Author({ name, birthdate });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm tác giả', error });
  }
};
