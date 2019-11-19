import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let bookSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  genre: { type: String, required: true, max: 100 },
  authorId: { type: String, required: true },
  image: { type: String, required: true },
});

const book = mongoose.model('Book', bookSchema);

// Export the model
export default book;