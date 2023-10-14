import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res, next) => {
  res.send('<h1>Hello world<h1>');
});

app.listen(app.get('port'), () => {
  console.info(`Server listen on port ${app.get('port')}`);
});
