import express from 'express'
import sequelize from './config/db.js'
import Book from './models/book.js'

const app = express()
const PORT = 3000

app.use(express.json())

sequelize.authenticate()
.then(() => console.log('Succesfull connection to database'))
.catch(err => console.log('Erorr' + err))

app.get('/books', async (req, res) => {
    try {
      const books = await Book.findAll();
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch books' });
    }
  });
  
  app.post('/books', async (req, res) => {
    try {
      const { title, author, year } = req.body;
      const book = await Book.create({ title, author, year });
      res.json(book);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create book' });
    }
  });
  

  app.put('/books/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, author, year } = req.body;
      const book = await Book.update({ title, author, year }, { where: { id } });
      res.json(book);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update book' });
    }
  });
  

  app.delete('/books/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Book.destroy({ where: { id } });
      res.json({ message: 'Book deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete book' });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });