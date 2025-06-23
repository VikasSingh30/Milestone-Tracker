const Tip = require('../models/Tip');
const Milestone = require('../models/Milestone');

const getTips = async (req, res) => {
  try {
    const tips = await Tip.find({ milestone: req.params.milestoneId })
      .populate('user', ['name'])
      .sort('-createdAt');
    res.json(tips);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const addTip = async (req, res) => {
  const { content } = req.body;

  try {
    const milestone = await Milestone.findById(req.params.milestoneId);
    if (!milestone) return res.status(404).json({ msg: 'Milestone not found' });

    const newTip = new Tip({
      milestone: req.params.milestoneId,
      user: req.user.id,
      content
    });

    const tip = await newTip.save();
    res.json(tip);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const likeTip = async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id);
    if (!tip) return res.status(404).json({ msg: 'Tip not found' });

    tip.likes += 1;
    await tip.save();
    res.json(tip);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getTips, addTip, likeTip };