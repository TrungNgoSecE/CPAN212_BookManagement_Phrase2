// backend/utils/send-mail.js
const nodemailer = require("nodemailer");
require("dotenv").config();

/**
 * Sends an email using Nodemailer
 * @param {string} to - Recipient email address
 * @param {string} message - The body content of the email
 * @param {string} subject - Email subject line
 * @returns {Promise<void>}
 */

async function sendEmail(to, message, subject = "Your OTP Code") {
  try {
    // Create transporter with your email service credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",     // You can change this to outlook, yahoo, etc.
      auth: {
        user: process.env.EMAIL_USER,   // your email
        pass: process.env.EMAIL_PASS,   // your app password
      },
    });

    const mailOptions = {
      from: `"Book Management System" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #4F46E5;">🔐 Verification Required</h2>
          <p>${message}</p>
          <br/>
          <p style="font-size: 12px; color: #6B7280;">
            If you did not request this, please ignore this email.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully to " + to);

  } catch (err) {
    console.error("❌ Failed to send email:", err);
    throw new Error("Email sending failed");
  }
}

module.exports = sendEmail;
