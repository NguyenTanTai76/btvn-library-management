import { Request, Response } from 'express';
import { Book } from '../models/Book';

// Lấy danh sách sách (bao gồm thông tin tác giả & thể loại)
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().populate('author').populate('category');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sách', error });
  }
};

// Thêm một cuốn sách mới
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, category, publishedDate } = req.body;
    const newBook = new Book({ title, author, category, publishedDate });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm sách', error });
  }
};

// Tìm kiếm sách theo tiêu đề + phân trang
export const searchBooks = async (req: Request, res: Response) => {
  try {
    const { title, page = 1, limit = 10 } = req.query;
    const query = title ? { title: new RegExp(title as string, 'i') } : {};

    const books = await Book.find(query)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .populate('author')
      .populate('category');

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tìm kiếm sách', error });
  }
};
