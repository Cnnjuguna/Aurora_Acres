import express from 'express';

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res, next) => {
  res.send('<h1>Hello world<h1>');
});

app.listen(app.get('port'), () => {
  console.info(`Server listen on port ${app.get('port')}`);
});
