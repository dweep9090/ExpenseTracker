require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const healthRoutes = require('./src/routes/healthRoutes');
const authRoutes = require('./src/routes/authRoutes');
const expenseRoutes = require('./src/routes/expenseRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.use((req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
});

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
