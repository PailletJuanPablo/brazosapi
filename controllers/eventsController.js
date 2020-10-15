const eventsService = require('../services/eventsService');

const getAll = async (req, res) => {
  try {
    const events = await eventsService.findAll();
    if (!events.length) {
      return res.status(200).json({ message: 'No events found.', events: [] });
    }
    return res.json({ message: 'OK', events });
  } catch (error) {
    return res.status(500).send({ message: 'Server error' });
  }
};


module.exports = { 
  getAll
};
