import express from 'express';
import cors from 'cors';
import compilerBackend from './api/compilerBackend.js';

const app = express();
app.use(cors());
app.use(express.json());

// Forward all API requests to the compiler backend
app.use('/api', compilerBackend);

// Root route to check API status
app.get('/', (req, res) => {
  res.json({ status: 'Online', message: 'Compiler API is running' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
  });
}

export default app;
