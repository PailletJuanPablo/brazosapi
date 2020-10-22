const contributorsService = require('../services/contributorsService');

const create = async (req, res) => {
    const result = await contributorsService.add(req.body);
    res.status(result.statusCode).json(result.result);
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
  create,
  getAll
  };
