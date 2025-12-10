const jwt = require("jsonwebtoken");

function encodeToken(user) {
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

module.exports = { encodeToken };
