const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3000;
// MongoDB connection
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'resumeData';
let db;
// Middleware for parsing JSON (Challenge Requirement)
app.use(express.json());
// POST /api/projects - Create new project (Challenge Requirement)
app.post('/api/projects', async (req, res) => {
try {
const projectData = req.body;
// Basic validation
if (!projectData.title || !projectData.description) {
return res.status(400).json({
success: false,
error: 'Title and description are required'
});
}
// Add timestamps
projectData.createdAt = new Date();
projectData.updatedAt = new Date();
// Insert into MongoDB (Challenge Requirement)
const result = await db.collection('projects').insertOne(projectData);
res.status(201).json({
success: true,
message: 'Project created successfully',
data: { ...projectData, _id: result.insertedId }
});
} catch (error) {
res.status(500).json({
success: false,
error: 'Failed to create project'
});
}
});
// GET /api/projects - Get all projects (Challenge Requirement)
app.get('/api/projects', async (req, res) => {
try {
// Retrieve from MongoDB (Challenge Requirement)
const projects = await db.collection('projects').find({}).toArray();
res.json({
success: true,
count: projects.length,
data: projects
});
} catch (error) {
res.status(500).json({
success: false,
error: 'Failed to retrieve projects'
});
}
});
// Connect to MongoDB and start server
MongoClient.connect(mongoUrl).then(client => {
db = client.db(dbName);
console.log('✅ Connected to MongoDB');
app.listen(PORT, () => {
console.log(`🚀 Server running on http://localhost:${PORT}`);
});
});