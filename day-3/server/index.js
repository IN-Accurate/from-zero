const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const subscribedEmails = new Set();

app.post('/api/input', (req, res) => {
  const { value } = req.body;

  if (!value || typeof value !== 'string') {
    return res
      .status(400)
      .json({ success: false, message: 'Email is required' });
  }

  const email = value.trim().toLowerCase();

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid Email address' });
  }

  if (subscribedEmails.has(email)) {
    return res
      .status(409)
      .json({ success: false, message: 'Email already subscribed' });
  }

  subscribedEmails.add(email);
  console.log('Received valid email: ', email);
  return res
    .status(201)
    .json({ success: true, message: 'Email Accepted', data: { email } });
});

app.get('/api/subscribers', (req, res) => {
  res.status(200).json({
    success: true,
    count: subscribedEmails.size,
    data: Array.from(subscribedEmails),
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
