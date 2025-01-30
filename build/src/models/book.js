const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: [ String ]
    },
    price: {
        type: Number,
        required: true
    },
    ratings: {
        type: Number, 
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    image: String,
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
            rating: { type: Number, required: true},
            comment: { type: String },
        }
    ]
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Book', bookSchema);