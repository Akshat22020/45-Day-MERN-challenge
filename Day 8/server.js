const express = require('express');
const app = express();

// Resume data arrays
const projects = [
  { id: 1, title: 'E-Commerce Platform', technologies: ['React', 'Node.js'] },
  { id: 2, title: 'Task Management App', technologies: ['Vue.js', 'Express'] }
];

const workExperience = [
  { id: 1, company: 'Tech Corp', position: 'Full Stack Developer' }
];

// GET /api/projects - Return all projects
app.get('/api/projects', (req, res) => {
  res.json({ success: true, count: projects.length, data: projects });
});

// GET /api/experience - Return work experience
app.get('/api/experience', (req, res) => {
  res.json({ success: true, count: workExperience.length, data: workExperience });
});

// GET /api/projects/:id - Return single project by ID
app.get('/api/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'Project not found'
    });
  }

  res.json({ success: true, data: project });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
