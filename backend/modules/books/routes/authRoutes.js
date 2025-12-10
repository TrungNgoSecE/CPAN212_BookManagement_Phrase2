const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const OTP = require("../models/otpModels");
const { encodeToken } = require("../../../utils/jwt-utils");
const sendEmail = require("../../../utils/send-mail");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  await OTP.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000) 
  });

  await sendEmail(email, `Your OTP is: ${otp}`);

  res.json({ message: "OTP sent to your email" });
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  const record = await OTP.findOne({ email, otp });

  if (!record) return res.status(400).json({ message: "Invalid OTP" });
  if (record.expiresAt < new Date()) return res.status(400).json({ message: "OTP expired" });

  const user = await User.findOne({ email });

  await OTP.deleteMany({ email }); 

  const token = encodeToken(user);

  res.json({ token, user });
});

module.exports = router;
