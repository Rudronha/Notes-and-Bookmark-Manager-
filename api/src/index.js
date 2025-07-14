import dotenv from 'dotenv';
import { connectDB } from './db.js';
import app from './app.js';

dotenv.config();
const PORT = process.env.PORT || 4000;

await connectDB().catch(err => {
  console.error(err);
  process.exit(1);
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));
