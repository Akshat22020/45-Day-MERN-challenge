const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  category: String,
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      createdAt: { type: Date, default: Date.now },
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
