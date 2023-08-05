import express, { Request } from 'express';
import cors from 'cors';
import { dbconnect } from './lib/db';
import dotenv from 'dotenv'
dotenv.config();
const app = express();
dbconnect();

// Middlewares
app.use(cors());
app.use(express.json({limit: '20mb'}));

// Routes
import userRoutes from './routes/UserRoutes';
import productRoutes from './routes/ProductRoutes';

app.use('/api/auth', userRoutes);
app.use('/api/app', productRoutes);

app.listen(9000, () => {
  console.log('server running at port 9000');
})
