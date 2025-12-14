const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/input', (req, res) => {
  const { value } = req.body;
  console.log('Recieved value from client: ', value);
  res.json({ success: true, value: value });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
