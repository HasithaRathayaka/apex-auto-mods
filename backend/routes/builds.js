const express = require('express');
const router = express.Router();
const Build = require('../models/Build');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const newBuild = new Build({ ...req.body, user: req.user.id });
    await newBuild.save();
    res.status(201).json(newBuild);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const builds = await Build.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(builds);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);
    if (!build) return res.status(404).json({ message: 'Build not found' });

    if (build.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await build.deleteOne();
    res.json({ message: 'Build deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);
    if (!build) return res.status(404).json({ message: 'Build not found' });

    if (build.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { color, selectedParts } = req.body;
    build.color = color || build.color;
    build.selectedParts = selectedParts || build.selectedParts;

    await build.save();
    res.json(build);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
