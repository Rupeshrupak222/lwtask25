const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(__dirname)); // To serve HTML

app.post('/upload', upload.single('video'), (req, res) => {
  const videoPath = req.file.path;

  // Setup Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS  // App password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'rupeshrupak49.com', // Change to recipient
    subject: '📹 New Video Recording',
    text: 'Find attached video',
    attachments: [{
      filename: 'recording.webm',
      path: videoPath
    }]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    fs.unlinkSync(videoPath); // Clean up uploaded file
    if (error) {
      console.error(error);
      return res.status(500).send('Email failed');
    }
    res.send('Email sent: ' + info.response);
  });
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
