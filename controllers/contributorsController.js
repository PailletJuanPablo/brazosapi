const contributorsService = require('../services/contributorsService');

const add = async (req, res) => {
  try {
    const { fullName, email, type, message } = req.body;
    if (!fullName || !email || !type || !message) {
      res.status(400).json({ message: 'Missing data on the request' });
    }else{
      const contributorAdded = await contributorsService.add(req.body);
      const contribution = {
        id: contributorAdded.id,
        fullName: contributorAdded.fullName,
        email: contributorAdded.email,
        type: contributorAdded.type,
        message: contributorAdded.message,
        createdAt: contributorAdded.createdAt
      }
      res.status(201).json({ message: 'Contribucion creada', contribution });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAll = async (req, res) => {
  try {
    const contributions = await contributorsService.findAll();
    if (!contributions.length) {
      return res.status(200).json({ message: "OK", contributions: [] });
    }
    return res.json({ message: "OK", contributions });
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
};

module.exports = {
  add,
  getAll
  };
