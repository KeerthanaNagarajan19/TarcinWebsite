import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/pdf', async (req, res) => {
  const { url } = req.query;
  if (!url || typeof url !== 'string') return res.status(400).send('Missing url');
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set('Content-Type', 'application/pdf');
    res.set('Access-Control-Allow-Origin', '*');
    res.send(response.data);
  } catch (err) {
    res.status(500).send('Failed to fetch PDF');
  }
});

export default router;