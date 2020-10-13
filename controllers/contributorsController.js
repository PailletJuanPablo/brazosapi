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

module.exports = { add };
