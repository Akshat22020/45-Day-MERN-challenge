const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;

// MongoDB connection
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'resumeData';
let db;

// Middleware
app.use(express.json());

/**
 * ROUTES
 */

// ✅ CREATE project
app.post('/api/projects', async (req, res) => {
  try {
    const newProject = req.body;
    newProject.createdAt = new Date();

    const result = await db.collection('projects').insertOne(newProject);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      projectId: result.insertedId
    });
  } catch (error) {
    console.error('❌ Error inserting project:', error);
    res.status(500).json({ success: false, error: 'Failed to create project' });
  }
});

// ✅ READ all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.collection('projects').find().toArray();
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch projects' });
  }
});

// ✅ READ one project by ID
app.get('/api/projects/:id', async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id);
    const project = await db.collection('projects').findOne({ _id: objectId });

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch project' });
  }
});

// ✅ UPDATE project
app.put('/api/projects/:id', async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id);
    const updateData = req.body;
    updateData.updatedAt = new Date();

    const result = await db.collection('projects').updateOne(
      { _id: objectId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update project' });
  }
});

// ✅ DELETE project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const objectId = new ObjectId(req.params.id);

    const result = await db.collection('projects').deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete project' });
  }
});

/**
 * START SERVER
 */
MongoClient.connect(mongoUrl)
  .then(client => {
    db = client.db(dbName);
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
  });
