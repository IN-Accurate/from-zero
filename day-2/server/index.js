const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  console.log('Received valid email: ', email);
  return res
    .status(200)
    .json({ success: true, message: 'Email Accepted', data: { email } });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
