const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ limit: '10mb' }));

app.post('/send-photo', async (req, res) => {
  const base64Image = req.body.image.split(';base64,').pop();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rupeshrupak49@gmail.com',
      pass: 'tyvb@4631'  // Use App Password
    }
  });

  const mailOptions = {
    from: 'rupeshrupak49@gmail.com',
    to: 'rupeshrupak609@gmail.com',
    subject: '📷 Captured Photo',
    text: 'Here is the captured photo.',
    attachments: [{
      filename: 'photo.png',
      content: Buffer.from(base64Image, 'base64')
    }]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: '✅ Email sent successfully!' });
  } catch (error) {
    res.json({ message: '❌ Failed to send email.', error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
