const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware/auth');
const {
    addToWishList,
    getWishList,
    removeFromWishList
} = require('../controllers/wishlist');

router.post('/wishlist', userAuth, addToWishList);
router.get('/wishlist', userAuth, getWishList);
router.delete('/wishlist/:id', userAuth, removeFromWishList);

module.exports = {
    wishlistRouter: router
}
