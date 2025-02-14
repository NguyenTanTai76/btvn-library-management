import { Request, Response } from 'express';
import Course, { Course as CourseType } from '../models/Author';

// Tạo khóa học mới
export const createCourse = async (req: Request, res: Response) => {
  try {
    const course: CourseType = new Course(req.body);
    await course.save();
    res.status(201).json({
      message: 'Tạo thành công',
      data: course,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Lấy danh sách tất cả khóa học
export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      data: courses,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Lấy thông tin khóa học theo ID
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        message: 'Không tìm thấy khóa học',
      });
    }
    res.status(200).json({
      data: course,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Cập nhật thông tin khóa học theo ID
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!course) {
      return res.status(404).json({
        message: 'Không tìm thấy khóa học',
      });
    }
    res.status(200).json({
      message: 'Cập nhật thành công',
      data: course,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Xóa khóa học theo ID
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({
        message: 'Không tìm thấy khóa học',
      });
    }
    res.status(200).json({
      message: 'Xóa thành công',
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
