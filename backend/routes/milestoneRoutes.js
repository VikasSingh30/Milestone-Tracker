const express = require('express');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');
const milestoneController = require('../controllers/milestoneController');

const router = express.Router();

router.get('/', auth, milestoneController.getMilestones);

router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('date', 'Date is required').not().isEmpty(),
      check('week', 'Week is required').isInt({ min: 1, max: 42 })
    ]
  ],
  milestoneController.createMilestone
);

router.put('/:id', auth, milestoneController.updateMilestone);
router.delete('/:id', auth, milestoneController.deleteMilestone);

module.exports = router;