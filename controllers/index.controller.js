module.exports = {
  index: async (req, res) => {
    const name = 'FAJAR';
    const title = 'halo ini title'
    return res.render('index', { name,title });
  },
};
