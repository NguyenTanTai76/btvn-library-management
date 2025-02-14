import { Request, Response } from 'express';
import profileModel from '../models/Category';
import userModel from '../models/Book'; // Import đúng model user

export const createUserWithProfile = async (req: Request, res: Response) => {
  try {
    const { name, email, age, address, phone } = req.body;

    // Tạo mới profile
    const newProfile = new profileModel({ age, address, phone });
    await newProfile.save();

    // Tạo mới user liên kết với profile
    const newUser = new userModel({ name, email, profile_id: newProfile.id });
    await newUser.save();

    // Phản hồi thành công
    res.status(201).json({
      message: 'User và Profile được tạo thành công',
      user: newUser,
      profile: newProfile,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Lỗi khi tạo User và Profile',
      error: error.message,
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find().populate('profile_id');

    res.status(200).json({
      data: users,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
