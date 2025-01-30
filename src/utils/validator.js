const validator = require("validator");

const signUpValidator = (req) => {
  const { name, email, password, phno, role } = req.body;
  if (!name) {
    throw new Error("Name should be required");
  } else if (!email) {
    throw new Error("Email should be required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  } else if (!password) {
    throw new Error("Password should be required");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Weak Password!!, Please enter Strong Password");
  } else if (String(phno).length != 10) {
    throw new Error("Phone number should contain 10 numbers");
  }
};

const singInValidator = (req) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Weak Password");
  }
};

const addBookValidator = (req) => {
    const { title, author, genre, price, rating, description, image} = req.body;
    if(!title || !author || !price || !description) {
        throw new Error("Invalida Book data to be add!");
    }
    if(typeof author != 'string' || author.trim().length === 0) {
        throw new Error('Invalid Author!')
    }
    if(typeof price != 'number' || price <= 0) {
        throw new Error('Invalid price!');
    }
    if(genre && (!Array.isArray(genre) || !genre.every((g) => typeof g === 'string'))) {
        throw new Error('Invalid Genre! It must be an array of strings.')
    }
}

module.exports = {
  signUpValidator,
  singInValidator,
  addBookValidator
};
