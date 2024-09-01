const express = require("express");
const app = express();
app.use(express.json());

let books = [];

// Root URL route
app.get("/", (req, res) => {
  res.send("Welcome to the Bookstore API");
});

// CREATE a new book
app.post("/books", (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    publishedDate: req.body.publishedDate,
  };
  books.push(book);
  res.status(201).send(book);
});

// READ all books
app.get("/books", (req, res) => {
  res.send(books);
});

// READ a book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");
  res.send(book);
});

// UPDATE a book by ID
app.put("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");

  book.title = req.body.title;
  book.author = req.body.author;
  book.publishedDate = req.body.publishedDate;

  res.send(book);
});

// DELETE a book by ID
app.delete("/books/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send("Book not found");

  const deletedBook = books.splice(bookIndex, 1);
  res.send(deletedBook);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
