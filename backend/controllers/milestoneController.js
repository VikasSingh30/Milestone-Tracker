const Milestone = require('../models/Milestone');

const getMilestones = async (req, res) => {
  try {
    const milestones = await Milestone.find({ user: req.user.id }).sort('-date');
    res.json(milestones);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const createMilestone = async (req, res) => {
  const { title, date, week, category, notes } = req.body;

  try {
    const newMilestone = new Milestone({
      user: req.user.id,
      title,
      date,
      week,
      category,
      notes
    });

    const milestone = await newMilestone.save();
    res.json(milestone);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateMilestone = async (req, res) => {
  const { title, date, week, category, notes } = req.body;

  try {
    let milestone = await Milestone.findById(req.params.id);
    if (!milestone) return res.status(404).json({ msg: 'Milestone not found' });

    // Check user owns milestone
    if (milestone.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    milestone = await Milestone.findByIdAndUpdate(
      req.params.id,
      { $set: { title, date, week, category, notes } },
      { new: true }
    );

    res.json(milestone);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteMilestone = async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id);
    if (!milestone) return res.status(404).json({ msg: 'Milestone not found' });

    // Check user owns milestone
    if (milestone.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await milestone.remove();
    res.json({ msg: 'Milestone removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getMilestones, createMilestone, updateMilestone, deleteMilestone };