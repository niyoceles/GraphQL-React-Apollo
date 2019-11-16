const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let authorSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  age: { type: Number, required: true },
});

const author = mongoose.model('Author', authorSchema);

// Export the model
module.exports = author;