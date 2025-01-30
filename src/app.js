const express = require("express");
const { DBConnect } = require("./config/db");
const { authRouter } = require("./routes/auth");
const { bookRouter } = require('./routes/book');
const { cartRouter } = require('./routes/cart');
const { wishlistRouter } = require('./routes/wishlist');
const cookieParser = require("cookie-parser");
require('dotenv').config('../../.env');


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(authRouter);
app.use(bookRouter);
app.use(wishlistRouter);
app.use(cartRouter);

DBConnect()
  .then(() => {
    console.log("BD Connected successfully!!");
  })
  .catch(() => {
    console.log("DB Connection Failure");
  });

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
