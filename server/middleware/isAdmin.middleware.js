function isAdmin(req, res, next) {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (user.role === "guest") {
    return res.status(403).json({
      success: false,
      message: "Guests are respected but only admins can make changes.",
    });
  } else if (user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied, only admins can make changes",
    });
  }

  next();
}

module.exports = isAdmin;
