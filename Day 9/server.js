const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 3000;
// MongoDB connection variables
const url = 'mongodb://localhost:27017';
const dbName = 'resumeData';
let db;
// Connect to MongoDB
async function connectToMongoDB() {
const client = new MongoClient(url);
try {
await client.connect();
console.log('✅ Connected successfully to MongoDB');
db = client.db(dbName);
console.log(`📊 Using database: ${dbName}`);
return db;
} catch (error) {
console.error('❌ MongoDB connection error:', error);
throw error;
}
}
// Middleware
app.use(express.json());
// Routes
app.get('/api/health', (req, res) => {
res.json({
status: 'healthy',
database: db ? 'connected' : 'disconnected',
timestamp: new Date().toISOString()
});
});
// Start server after connecting to MongoDB
connectToMongoDB().then(() => {
app.listen(PORT, () => {
console.log(`🚀 Server running on http://localhost:${PORT}`);
});
}).catch(error => {
console.error('Failed to start server:', error);
process.exit(1);
});