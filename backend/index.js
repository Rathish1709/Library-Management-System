const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error', error));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Schemas for Books, Members, and Transactions
const bookSchema = new mongoose.Schema({ title: String, author: String, stock: Number });
const memberSchema = new mongoose.Schema({ name: String, books: [String], debt: Number });
const transactionSchema = new mongoose.Schema({ memberName: String, bookTitle: String, rent: Number });

const Book = mongoose.model('Book', bookSchema);
const Member = mongoose.model('Member', memberSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

// Routes

// Books Routes
app.post('/books', async (req, res) => {
  const { title, author, stock } = req.body;
  const newBook = new Book({ title, author, stock });
  await newBook.save();
  res.json(newBook);
});

app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.json({ message: 'Book deleted' });
});

// Members Routes
app.post('/members', async (req, res) => {
  const { name } = req.body;
  const newMember = new Member({ name, books: [], debt: 0 });
  await newMember.save();
  res.json(newMember);
});

app.get('/members', async (req, res) => {
  const members = await Member.find();
  res.json(members);
});

app.put('/members/:id', async (req, res) => {
  const { id } = req.params;
  const { name, books, debt } = req.body;
  const updatedMember = await Member.findByIdAndUpdate(id, { name, books, debt }, { new: true });
  res.json(updatedMember);
});

app.delete('/members/:id', async (req, res) => {
  const { id } = req.params;
  await Member.findByIdAndDelete(id);
  res.json({ message: 'Member deleted' });
});

// Transactions Routes
app.post('/transactions', async (req, res) => {
  const { memberName, bookTitle, rent } = req.body;
  const newTransaction = new Transaction({ memberName, bookTitle, rent });
  await newTransaction.save();
  res.json(newTransaction);
});

app.get('/transactions', async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
