const express = require('express');
const router = express.Router();
const {
  getForms,
  submitForm,
  deleteForm,
  updateForm
} = require('../controllers/formController');

router.get('/', getForms);
router.post('/', submitForm);
router.put('/:id', updateForm);
router.delete('/:id', deleteForm);

module.exports = router;
