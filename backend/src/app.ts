import express from 'express';
import cors from 'cors';
import scanRoutes from './routes/scan';
import scansRoutes from './routes/scans';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/scan', scanRoutes);
app.use('/api/scans', scansRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app; 