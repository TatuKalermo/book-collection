import { Router } from 'express';

const router = Router();

// Get all books
router.get('/', async (req, res) => {
  const books = await req.context.models.Book.findAll();
  return res.send(books);
});

// Get a single book with id
router.get('/:bookId', async (req, res) => {
  const book = await req.context.models.Book.findByPk(req.params.bookId);
  return res.send(book);
});

// Create a book
router.post('/', async (req, res) => {
  const book = await req.context.models.Book.create({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    collectionId: req.context.library.id,
  });

  return res.send(book);
});

// Update a single book
router.put('/:bookId', async (req, res) => {
  const id = await req.context.models.Book.update(
    {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      collectionId: req.context.library.id,
    },
    { where: { id: req.params.bookId } }
  );

  return res.send(id);
});

// Delete a book
router.delete('/:bookId', async (req, res) => {
  await req.context.models.Book.destroy({
    where: { id: req.params.bookId },
  });

  return res.send(true);
});

export default router;
