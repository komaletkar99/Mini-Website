import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Price from '../../models/price';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect('mongodb://localhost:27017/priceDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  const { symbol } = req.query;

  if (!symbol || typeof symbol !== 'string') {
    res.status(400).json({ error: 'Invalid symbol' });
    return;
  }

  try {
    const prices = await Price.find({ symbol })
      .sort({ timestamp: -1 })
      .limit(20);
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;
