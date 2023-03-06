import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models';

const app = express();

app.use(cors());

app.use(async (req, res, next) => {
  req.context = {
    models,
    library: await models.Collection.findByName('library'),
  };
  next();
});

// Get the whole collection
app.get('/', async (req, res) => {
  const library = await req.context.models.Collection.findByPk(
    req.context.library.id
  );
  return res.send(library);
});

app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

const eraseDatabaseOnSync = true;

const createCollection = async () => {
  await models.Collection.create({
    name: 'library',
  });
};

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createCollection();
  }

  app.listen(process.env.PORT || 3000, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});
