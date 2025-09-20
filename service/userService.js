const userModel = require('../model/userModel');

const jwt = require('jsonwebtoken');
const SECRET = 'supersecret'; // Em produção, use variável de ambiente

exports.register = (req, res) => {
  const { username, password, isFavored } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  if (userModel.findUser(username)) {
    return res.status(409).json({ message: 'User already exists.' });
  }
  userModel.addUser({ username, password, isFavored: !!isFavored, balance: 10000 });
  res.status(201).json({ message: 'User registered successfully.' });
};


exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  const user = userModel.findUser(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  // Gera o token JWT
  const token = jwt.sign({ username: user.username, isFavored: user.isFavored }, SECRET, { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful.', token });
};

exports.getAllUsers = (req, res) => {
  res.json(userModel.getAllUsers());
};
