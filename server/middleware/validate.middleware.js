const validate = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.json("Username va passord bo'lishi shart!");

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Parol 6ta belgidan kam bo'lmasligi kerak" });
  }

  next();
};
