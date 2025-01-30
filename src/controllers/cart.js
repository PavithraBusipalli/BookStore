const User = require("../models/user");
const Book = require('../models/book');

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        const { bookId, quantity } = req.body;
        if(!bookId || !quantity) {
            throw new Error('Book Id and Quantity are required!')
        }
        const existingItemIndex = user.cart.findIndex(item => item._id.toString() === bookId.toString());
        if (existingItemIndex !== -1) {
            user.cart[existingItemIndex].quantity += quantity;
        } else {
            user.cart.push({ _id: bookId, quantity });
        }
        await user.save();
        res.status(200).json({
            message: "Item added to cart successfully",
            cart: user.cart
        });        
    } catch(err) {
        res.status(400).json({
            ERROR: err.message
        })
    }
}

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        const cartItems = [];
        await Promise.all(user.cart.map(async(item) => {
            const book = await Book.findById(item._id);
            cartItems.push({quantity: item.quantity, book: book });
        }));
        if(cartItems.length) { 
        }
        res.status(200).json({
            cart: cartItems
        });
    } catch(err) {
        res.status(400).json({
            ERROR: err.message
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const quantity = req.body.quantity;
        const userId = req.user.id;
        const user = await User.findById(userId);
        const cart = user.cart;
        const itemIndex = user.cart.findIndex(item => item._id.toString() === bookId.toString());
        if(itemIndex !== -1) {
            user.cart[itemIndex].quantity = quantity;
            await user.save();
            return res.json({
                Message: "Cart Updated successfully!",
                cart: user.cart
            })
        }
        else {
            res.status(400).json({
                Message: "Book not found!"
            })
        }
    } catch(err) {
        res.status(400).json({
            ERROR: err.message
        })
    }
}

const deleteFromCart = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const quantity = req.body.quantity;
        const userId = req.user.id;
        const user = await User.findById(userId);
        const cart = user.cart;
        const itemIndex = user.cart.findIndex(item => item._id.toString() === bookId.toString());
        if(itemIndex !== -1) {
            if (user.cart[itemIndex].quantity > quantity) {
                user.cart[itemIndex].quantity -= quantity;
                await user.save();
                return res.json({
                    Message: "Cart Deleted successfully!",
                    cart: user.cart
                })
            } 
            else {
                return res.status(400).json({
                    Meesage: "Quantity should be less"
                })
            }
        }
        else {
            res.status(400).json({
                Message: "Book not found!"
            })
        }
    } catch(err) {
        res.status(400).json({
            ERROR: err.message
        })
    }
}

module.exports = {
    addToCart,
    getCart,
    updateCart,
    deleteFromCart,
}