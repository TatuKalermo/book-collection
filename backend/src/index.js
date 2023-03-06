import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models, { sequelize } from './models';
import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    library: await models.Collection.findByName('library'),
  };
  next();
});

// * Routes * //

app.use('/books', routes.book);

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
    console.log(`Library app listening on port ${process.env.PORT}!`)
  );
});
