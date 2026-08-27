const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  let admin = await Admin.findOne({
    username: username.trim(),
  }).select("+password");

  // Create the first MongoDB admin account once, using configured credentials.
  if (!admin) {
    const initialUsername = process.env.ADMIN_USERNAME || "AAAAAA";
    const initialPassword = process.env.ADMIN_PASSWORD || "AAAAAA";

    if (username.trim() === initialUsername && password === initialPassword) {
      admin = await Admin.create({
        username: initialUsername,
        password: await bcrypt.hash(initialPassword, 12),
      });
    }
  }

  const passwordMatches = admin
    ? await bcrypt.compare(password, admin.password)
    : false;

  if (!admin || !passwordMatches) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password",
    });
  }

  const token = jwt.sign(
    { id: admin._id, username: admin.username, role: admin.role },
    process.env.JWT_SECRET || "development-secret",
    { expiresIn: "1d" }
  );

  return res.json({
    success: true,
    token,
    user: { id: admin._id, username: admin.username, role: admin.role },
  });
};

module.exports = { login };
