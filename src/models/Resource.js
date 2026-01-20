const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please add a resource name'] },
  type: { type: String, required: [true, 'Please add a resource type (e.g., EC2, S3)'] },
  status: { type: String, enum: ['Active', 'Stopped', 'Terminated'], default: 'Active' },
  cost: { type: Number, required: [true, 'Please add the monthly cost'] },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Resource', ResourceSchema);