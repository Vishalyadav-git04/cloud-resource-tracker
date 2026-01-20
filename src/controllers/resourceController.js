const Resource = require('../models/Resource');

// @desc    Get all resources
// @route   GET /api/resources
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json({ success: true, count: resources.length, data: resources });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Add a new resource
// @route   POST /api/resources
exports.createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json({ success: true, data: resource });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, error: error.message });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, error: 'Resource not found' });
    }
    await resource.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update a resource
// @route   PUT /api/resources/:id
exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated object
      runValidators: true // Ensure updates follow the schema
    });

    if (!resource) {
      return res.status(404).json({ success: false, error: 'Resource not found' });
    }

    res.status(200).json({ success: true, data: resource });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};