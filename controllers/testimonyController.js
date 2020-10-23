const multer = require("multer");
const testimonyService = require("../services/testimonyService");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fields: 4,
    fileSize: 60000000,
    files: 1,
    parts: 5,
  },
});

const getAll = async (req, res) => {
  try {
    const testimony = await testimonyService.findAll(req);
    if (!testimony.length) {
      return res.status(404).json({ message: "No Testimonies Found", testimony: [] });
    }
    return res.status(200).json({ message: "OK", testimony });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const uploadTestimony = (req, res) => {
  upload.single("media")(req, res, async (err) => {
    const testimony = {
      name: req.body.name,
      content: req.body.content,
    };
    organizationId = req.user.organizationId;
    const result = await testimonyService.create(
      testimony,
      req.file,
      organizationId
    );
    res.status(result.statusCode || 500).json(result.result || { message: 'Server error' });
  });
};

const editById = async (req, res) => {
  upload.single("media")(req, res, async (err) => {
    const testimony = {
      name: req.body.name,
      content: req.body.content,
    };
    organizationId = req.user.organizationId;
    if (!req.file) {
      const editedTestimony = await testimonyService.edit(
        req.params.id,
        testimony,
        organizationId
      );
      res.status(editedTestimony.statusCode).json(editedTestimony.result);
      return;
    }
    const editedTestimony = await testimonyService.edit(
      req.params.id,
      testimony,
      organizationId,
      req.file
    );
    res.status(editedTestimony.statusCode || 500).json(editedTestimony.result || { message: 'Server error' });
  });
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTestimony = await testimonyService.remove(id);
    if (!deletedTestimony) {
      res.status(400).json({ message: 'Testimony was not found.' })
    } else {
      res.status(200).json({ message: 'Testimony has been deleted.', testimony: deletedTestimony })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
    throw error;
  }
}

module.exports = {
  uploadTestimony,
  editById,
  getAll,
  deleteById
};
