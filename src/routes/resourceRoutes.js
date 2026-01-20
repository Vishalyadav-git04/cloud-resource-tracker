const express = require('express');
const router = express.Router();
const { getResources, createResource, deleteResource, updateResource} = require('../controllers/resourceController');

router.route('/')
  .get(getResources)
  .post(createResource);

router.route('/:id')
  .delete(deleteResource)
  .put(updateResource);

module.exports = router;