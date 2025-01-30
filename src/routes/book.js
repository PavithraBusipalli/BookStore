const express = require("express");
const { userAuth, adminAuth } = require("../middleware/auth");
const {
  addBookController,
  getSingleBookController,
  getAllBooksController,
  updateBookController,
  deleteBookController,
} = require("../controllers/book");

const router = express.Router();

router.post("/addBook", userAuth, adminAuth, addBookController);
router.get("/getSingleBook/:id", userAuth, adminAuth, getSingleBookController);
router.get("/getAllBooks", userAuth, adminAuth, getAllBooksController);
router.put("/updateBook/:id", userAuth, adminAuth, updateBookController);
router.delete("/deleteBook/:id", userAuth, adminAuth, deleteBookController);

module.exports = {
  bookRouter: router
}
