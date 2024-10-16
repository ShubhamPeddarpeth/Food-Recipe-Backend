import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userLogin, userRegister } from './routes/user.js';
import { recipeRouter } from './routes/recipes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', userRegister);
app.use('/auth', userLogin);
app.use('/recipes', recipeRouter);

const mongoURI = process.env.MONGODB;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to Database!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
  });

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`SERVER STARTED TO ${port}`);
});
