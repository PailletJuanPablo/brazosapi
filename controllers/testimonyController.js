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
      return res.status(200).json({ message: "No testimony found.", testimony: [] });
    }
    return res.json({ message: "OK", testimony });
  } catch (error) {
    return res.status(500).send({ message: "Server error" });
  }
};

const uploadTestimony = (req, res) => {
  upload.single("media")(req, res, async (err) => {
    const testimony = {
      name: req.body.name,
      content: req.body.content,
    };
    organizationId = req.user.organizationId;
    console.log(req.user)
    const result = await testimonyService.create(
      testimony,
      req.file,
      organizationId
    );
    res.status(result.statusCode).json(result.result);
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
      console.log(editedTestimony);
      res.status(editedTestimony.statusCode).json(editedTestimony.result);
      return;
    }
    const editedTestimony = await testimonyService.edit(
      id,
      testimony,
      organizationId,
      req.file
    );
    res.status(editedTestimony.statusCode).json(editedTestimony.result);
  });
};

module.exports = {
  uploadTestimony,
  editById,
  getAll
};
