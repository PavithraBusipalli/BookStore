const Book = require("../models/book");
const { addBookValidator } = require('../utils/validator');

const addBookController = async (req, res) => {
  try {
    addBookValidator(req);
    const { title, author, genre, price, ratings, description, image} = req.body;
    const existBook = await Book.findOne({title: title});
    if(existBook) {
      throw new Error('Book with title already exists!');
    }
    const newBook = new Book({title, author, genre, price, ratings, description, image});
    await newBook.save();
    res.json({
      Message: "Book added successfully!!",
      Book: {newBook}
    })
  } catch (err) {
    res.status(403).json({
      ERROR: err.message,
    });
  }
};


const getSingleBookController = async (req, res) => {
  try {
    const bookId = req.params.id;
    const getBook = await Book.findById({_id: bookId});
    if(!getBook) {
      res.status(403).json({
        Message: 'Book with Id not found!'
      })
    } else {
      res.json({
        Message: "Book fetched successfully!",
        Book: {getBook}
      });
    }
  } catch (err) {
    res.status(403).json({
      ERROR: err.message,
    });
  }
};


const getAllBooksController = async (req, res) => {
  try {
    const books = await Book.find({});
    if(!books) {
      res.json({
        Message: "No Books to fetch",
        books: []
      })
    } else {
      res.json({
        Message: 'Books fetched successfully!',
        books
      })
    }
  } catch (err) {
    res.status(403).json({
      ERROR: err.message,
    });
  }
};


const updateBookController = async (req, res) => {
  try {
    const { title, author, genre, price, description, image} = req.body;
    const id = req.params.id;
    const findId = await Book.findById({_id: id});
    if(!findId) {
      return res.status(403).json({
        Message: 'Book with Id not found!'
      })
    }
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new:true});
    return res.json({
      Message: "Book Details updated successfully!",
      updatedBook
    })
  } catch (err) {
    res.status(403).json({
      ERROR: err.message,
    });
  }
};


const deleteBookController = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await Book.findByIdAndDelete({_id: id});
    if(deletedBook) {
      res.json({
        Message: "Book deleted successfully!",
        deletedBook
      })
    } else {
      throw new Error('Something went wrong!');
    }
  } catch (err) {
    res.status(403).json({
      ERROR: err.message,
    });
  }
};


module.exports = {
  addBookController,
  getSingleBookController,
  getAllBooksController,
  updateBookController,
  deleteBookController,
};
