const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock data
const mockPredictions = [];
const mockRoutes = [
  { id: 'metro-1', name: 'Metro Line 1', type: 'metro', color: '#3B82F6' },
  { id: 'bus-101', name: 'Bus Route 101', type: 'bus', color: '#10B981' },
  { id: 'train-a', name: 'Train Station A', type: 'train', color: '#8B5CF6' },
];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get routes
app.get('/api/routes', (req, res) => {
  res.json(mockRoutes);
});

// Predict crowding
app.post('/api/predict', (req, res) => {
  const { route, date, time, weather, holiday } = req.body;
  
  // Simple mock prediction logic
  const hour = parseInt(time.split(':')[0]);
  let level = 'medium';
  let confidence = 75;
  
  if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
    level = 'high';
    confidence = 85;
  } else if (hour >= 22 || hour <= 5) {
    level = 'low';
    confidence = 90;
  }
  
  const prediction = {
    id: `pred_${Date.now()}`,
    route,
    date,
    time,
    level,
    confidence,
    estimatedCrowd: `${Math.floor(Math.random() * 100) + 50} people`,
    historicalAccuracy: Math.floor(Math.random() * 15) + 80,
    timestamp: new Date().toISOString(),
  };
  
  mockPredictions.push(prediction);
  res.json(prediction);
});

// Submit feedback
app.post('/api/feedback', (req, res) => {
  const feedback = {
    id: `fb_${Date.now()}`,
    ...req.body,
    timestamp: new Date().toISOString(),
  };
  res.json({ success: true, feedback });
});

// Get analytics
app.get('/api/analytics', (req, res) => {
  res.json({
    totalPredictions: mockPredictions.length,
    accuracyRate: 89.2,
    avgCrowdLevel: 2.3,
    peakHours: ['08:00', '17:00'],
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock backend running on http://localhost:${PORT}`);
});