const mongoose = require('mongoose');

const DBConnect = async () => {
    await mongoose.connect(process.env.MONGO_URL);
}

module.exports = {
    DBConnect,
}
