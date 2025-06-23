const express = require('express');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');
const tipController = require('../controllers/tipController');

const router = express.Router();

router.get('/milestone/:milestoneId', auth, tipController.getTips);

router.post(
  '/milestone/:milestoneId',
  [
    auth,
    [
      check('content', 'Content is required').not().isEmpty()
    ]
  ],
  tipController.addTip
);

router.post('/:id/like', auth, tipController.likeTip);

module.exports = router;