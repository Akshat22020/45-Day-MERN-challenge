const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// MongoDB connection
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'blogDB';
let db;

async function connectToMongoDB() {
  const client = new MongoClient(url);
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db(dbName);
}

connectToMongoDB().catch(console.error);

// Middleware
app.use(bodyParser.json());

// Routes

// CREATE
app.post('/api/blogs', async (req, res) => {
  try {
    const blog = {
      title: req.body.title,
      content: req.body.content,
      author: req.body.author || 'Akshat Raj',
      tags: req.body.tags || [],
      published: req.body.published || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await db.collection('blogs').insertOne(blog);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// READ ALL
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await db.collection('blogs').find().toArray();
    res.json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// READ ONE
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await db
      .collection('blogs')
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const updateData = { ...req.body, updatedAt: new Date() };
    const result = await db
      .collection('blogs')
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: updateData },
        { returnDocument: 'after' }
      );
    if (!result.value) return res.status(404).json({ success: false, error: 'Blog not found' });
    res.json({ success: true, data: result.value });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const result = await db
      .collection('blogs')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ success: false, error: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
