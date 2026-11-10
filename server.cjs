/**
 * ============================================================
 *  Saint Margaret’s Bay Area Gallery Backend Server
 *  ------------------------------------------------------------
 *  Description:
 *  This Express.js server provides backend functionality for the
 *  Saint Margaret’s Bay Area Gallery web application. It handles
 *  image uploads, OTP-based email verification, contact form
 *  confirmation emails, and serves verified images for display.
 *
 *  Key Features:
 *   - Secure image uploads with file type and size validation
 *   - Temporary unapproved image storage before admin verification
 *   - OTP (One-Time Password) email verification using Nodemailer
 *   - Inquiry confirmation email system
 *   - Basic in-memory rate limiting per IP address
 *   - Static file serving for approved images and frontend build
 *
 *  Tech Stack:
 *   - Node.js + Express.js
 *   - Nodemailer (email service)
 *   - Multer (file uploads)
 *   - CORS & Body-Parser middleware
 *
 *  Directory Structure:
 *   - /gallery/approved     → Verified images (served via /api/gallery/approved endpoint)
 *   - /gallery/unapproved   → Pending images awaiting verification
 *   - /dist                 → Frontend build output served by Express
 *
 *  Environment Notes:
 *   - Replace hardcoded credentials with environment variables
 *     in production (e.g., Gmail auth password).
 *   - OTPs are stored in-memory and cleared upon verification.
 *     Use a database or cache (e.g., Redis) for production-grade apps.
 *
 *  Authors:
 *   @author Mohammad Zaid Khan
 *   @author Samson Mate (A00476626)
 *
 *  Last Updated: October 2025
 * ============================================================
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5555;

app.use(bodyParser.json());
app.use(cors());

// ==== Paths ====
const approvedPath = path.join(__dirname, 'gallery', 'approved');
const unapprovedPath = path.join(__dirname, 'gallery', 'unapproved');

fs.mkdirSync(approvedPath, { recursive: true });
fs.mkdirSync(unapprovedPath, { recursive: true });

// ==== Multer Storage ====
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, unapprovedPath),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

// Allow only common image mime types/extensions
const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isImageMime = file.mimetype.startsWith('image/');
    if (!isImageMime || !allowedExtensions.has(ext)) {
      return cb(new Error('Only image files are allowed (.jpg, .jpeg, .png, .webp)'));
    }
    cb(null, true);
  }
});

// Simple in-memory rate limit per IP: max 20 uploads per 10 minutes
const uploadAttemptsByIp = new Map();
function checkRateLimit(req, res) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxAttempts = 20;
  const ip = req.ip || req.connection?.remoteAddress || 'unknown';
  const attempts = uploadAttemptsByIp.get(ip) || [];
  const recent = attempts.filter((t) => now - t < windowMs);
  if (recent.length >= maxAttempts) {
    res.status(429).json({ error: 'Too many uploads. Please try again later.' });
    return false;
  }
  recent.push(now);
  uploadAttemptsByIp.set(ip, recent);
  return true;
}

// ==== In-memory store for OTPs ====
let otpStore = {};

// ==== Email Configuration ====
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'saintmargaretsbayarea@gmail.com',
    pass: 'mjxqziowlnnywqwb', // Replace with env variable in production
  },
});

// ==== OTP Generation ====
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

/**
 * ==== API ROUTES ====
 */

// ==== Send OTP ====
app.post('/send-otp', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const otp = generateOtp();
  otpStore[email] = otp;

  const mailOptions = {
    from: 'saintmargaretsbayarea@gmail.com',
    to: email,
    subject: 'Your OTP for Verification',
    text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error('Failed to send OTP email:', err);
      return res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
    }
    console.log('OTP sent to:', email);
    res.status(200).json({ message: 'OTP sent successfully' });
  });
});

// ==== Verify OTP ====
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

  if (otpStore[email] === otp) {
    delete otpStore[email];
    return res.status(200).json({ message: 'OTP verified successfully' });
  }

  res.status(400).json({ error: 'Invalid or expired OTP' });
});

// ==== Send Confirmation Email ====
app.post('/send-confirmation', (req, res) => {
  const { email, fullName, inquiryType, message } = req.body;

  if (!email || !fullName || !inquiryType || !message) {
    return res.status(400).json({ error: 'All fields are required to send confirmation email' });
  }

  const mailOptions = {
    from: 'saintmargaretsbayarea@gmail.com',
    to: email,
    subject: 'Confirmation of Your Inquiry',
    text:
      `Hello ${fullName},\n\n` +
      `Thank you for reaching out to us with your inquiry. Here are the details:\n\n` +
      `Inquiry Type: ${inquiryType}\nMessage: ${message}\n\n` +
      `We will get back to you as soon as possible.\n\n` +
      `Best regards,\nThe Support Team`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error('Failed to send confirmation email:', err);
      return res.status(500).json({ error: 'Failed to send confirmation email' });
    }
    console.log('Confirmation email sent to:', email);
    res.status(200).json({ message: 'Confirmation email sent successfully' });
  });
});

// ==== Upload Images ====
function handleUpload(req, res) {
  // Check if files are present
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  // Check total size
  const totalSize = req.files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > 100 * 1024 * 1024) { // 100 MB
    return res.status(400).json({ error: 'Total upload exceeds 100MB limit' });
  }

  // Collect uploaded files
  const uploadedFiles = req.files.map(file => file.filename);
  console.log(`Uploaded ${uploadedFiles.length} image(s) to unapproved folder.`);

  res.status(200).json({
    message: `Successfully uploaded ${uploadedFiles.length} image(s)! They will be visible for everyone once verified by site administrators.`,
    files: uploadedFiles,
  });
}

// New RESTful upload endpoint (preferred)
app.post('/api/gallery/uploads', (req, res, next) => {
  if (!checkRateLimit(req, res)) return;
  next();
}, upload.array('images'), (req, res) => handleUpload(req, res));

// Back-compat legacy endpoint
app.post('/upload-image', (req, res, next) => {
  if (!checkRateLimit(req, res)) return;
  next();
}, upload.array('images'), (req, res) => handleUpload(req, res));

/**
 * Returns list of verified images urls
 */
app.get('/api/gallery/approved', (req, res) => {
  fs.readdir(approvedPath, (err, files) => {
    if (err) return res.status(500).json({ error: 'Could not read verified images' });

    const imageFiles = files.filter(f => allowedExtensions.has(path.extname(f).toLowerCase()));
    // Use /api/gallery/approved/ prefix so images are accessible through the API proxy
    const urls = imageFiles.map(fname => `/api/gallery/approved/${fname}`);
    res.json({ images: urls });
  });
});

// ==== Serve verified images as static files through API endpoint ====
app.use('/api/gallery/approved', express.static(approvedPath));

// ==== Serve Frontend and catch-all for SPA ====
const clientBuildPath = path.join(__dirname, 'dist');
app.use(express.static(clientBuildPath));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// ==== Start Server ====
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
