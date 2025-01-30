const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware/auth');
const {
    addToCart,
    getCart,
    updateCart,
    deleteFromCart
} = require('../controllers/cart');

router.post('/cart', userAuth, addToCart);
router.get('/cart', userAuth, getCart);
router.put('/cart/:bookId', userAuth, updateCart);
router.delete('/cart/:bookId', userAuth, deleteFromCart);

module.exports = {
    cartRouter: router,
}