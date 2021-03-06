const multer = require('multer');
const entriesService = require('../services/entriesService');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fields: 4,
    fileSize: 60000000,
    files: 1,
    parts: 5
  }
});
const db = require('../models/index');

const getById = async (req, res) => {
  try {
    const oneEntry = await entriesService.findById(req.params);
    return res.status(200).json(oneEntry.result);
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Server error' });
  }
};

const getAll = async (req, res) => {
  try {
    const entries = await entriesService.findAll();
    if (!entries.length) {
      return res.status(200).json({ message: 'No entries found.', entries: [] });
    }
    return res.json({ message: 'OK', entries });
  } catch (error) {
    return res.status(500).send({ message: 'Server error' });
  }
};

const create = (req, res) => {
  upload.single('media')(req, res, async (err) => {
    //ToDo:
    const entry = {
      title: req.body.title,
      content: req.body.content,
      category: req.body.category
    };
    const userId = req.user.userId
    const result = await entriesService.create(entry, req.file, userId);
    res.status(result.statusCode).json(result.result);
  });
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEntry = await entriesService.remove(id);
    if (!deletedEntry) {
      res.status(400).json({ message: 'Entry was not found.' })
    } else {
      res.status(200).json({ message: 'Entry has been deleted.', entry: deletedEntry })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
    throw error;
  }
}

const editById = async (req, res) => {
  upload.single('media')(req, res, async (err) => {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const entry = { title, content, category };
    const userId = req.user.userId
    if (!req.file) {
      const editedEntries = await entriesService.edit(id, entry, userId);
      res.status(editedEntries.statusCode).json(editedEntries.result);
      return;
    }
    const editedEntries = await entriesService.edit(id, entry, userId, req.file);
    res.status(editedEntries.statusCode).json(editedEntries.result);
  });
}

module.exports = {
  getById,
  getAll,
  deleteById,
  editById,
  create
};
