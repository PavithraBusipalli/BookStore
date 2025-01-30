const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phno: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    wishlist: [ { type: mongoose.Schema.Types.ObjectId, ref: "Book"}],
    cart: [
      {
        book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
        quantity: { type: Number, required: true },
      },
    ],
    orders: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Order'} ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
