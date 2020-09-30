const {findNews} = require('../services/newsService');

const getAllNewsController = async (req, res) => {
  const news = await findNews();

  if (!news) return res.status(500).send({ message: 'Server error' });

  if (news.length === 0)
    return res.status(200).json({ message: 'No news found.' });

  res.json({ message: 'OK', news });
};

module.exports = getAllNewsController;
