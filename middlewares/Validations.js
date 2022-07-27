const nameValidation = (req, res, next) => {
  const { Name } = req.body;
  if (!Name || Name === '') {
    return res.status(400).json({ message: 'Name is required!' });
  }
  if (Name.length < 3) { 
    return res.status(400).json({ message: "At least three character is required." }) };
  next();
};


module.exports = {
  nameValidation
};
