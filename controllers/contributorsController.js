const contributorsService = require('../services/contributorsService');

const add = async (req, res) => {
  try {
    const { fullName, email, type, message } = req.body;
    if (!fullName || !email || !type || !message) {
      res.status(400).json({ message: 'Missing data on the request' });
      throw new Error('Missing data on the request');
    }
    const contributorAdded = await contributorsService.add(req.body);
    if (!contributorAdded) {
      throw new Error('No se creó el contribuyente.');
    } else {
      res.status(200).json({ message: 'Contribuyente creado.' });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ message: 'Server error' });
  }
};

const getAll = async (req, res) => {
  try {
    const contributions = await contributorsService.findAll();
    if (!contributions.length) {
      return res.status(200).json({ message: "No contributions found.", contributions: [] });
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
