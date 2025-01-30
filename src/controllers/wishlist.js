const Book = require('../models/book');
const User = require('../models/user');


const addToWishList = async (req, res) => {
    try {
        const id = req.body.id;
        const userId = req.user.id;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.wishlist.push(book);
        await user.save();
        res.status(200).json({ message: "Book added to wishlist", wishlist: user.wishlist });
    } catch(err) {
        res.status(400).json({
            ERROR: err.message
        })
    }
} 

const getWishList = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('wishlist');
        res.status(200).json({ wishlist: user.wishlist });
        console.log('wishList: ', user.wishlist);
    } catch(err) {
        res.status(400).json({
            ERROR: err.message
        })
    }
} 

const removeFromWishList = async (req, res) => {
    try {
        const bookId = req.params.id;
        const findId = await Book.findById(bookId);
        if(!findId) {
            return res.status(403).json({
                Message: "Book with Id not found!"
            })
        }
        const userId = req.user.id;
        const user = await User.findById(userId)
        const removedBook = user.wishlist.find(book => book._id.toString() === bookId);
        user.wishlist.pull(bookId);
        await user.save();
        res.json({
            Message: "Book removed from wishlist",
            Book: {removedBook}
        })
    } catch(err) {
        res.status(400).json({
            ERROR: err.message
        })
    }
} 


module.exports = {
    addToWishList,
    getWishList,
    removeFromWishList
}