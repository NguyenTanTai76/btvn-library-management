import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: { type: String, required: true, index: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  publishedDate: { type: Date, required: true },
});

const Book = model('Book', bookSchema);
export default Book;
