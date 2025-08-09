const userModel = require('../model/userModel');

exports.transfer = (req, res) => {
  const { from, to, amount } = req.body;
  if (!from || !to || typeof amount !== 'number') {
    return res.status(400).json({ message: 'From, to, and amount are required.' });
  }
  const sender = userModel.findUser(from);
  const recipient = userModel.findUser(to);
  if (!sender || !recipient) {
    return res.status(404).json({ message: 'Sender or recipient not found.' });
  }
  if (sender.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance.' });
  }
  if (!recipient.isFavored && amount >= 5000) {
    return res.status(403).json({ message: 'Transfers >= R$ 5.000,00 only allowed to favored recipients.' });
  }
  sender.balance -= amount;
  recipient.balance += amount;
  res.status(200).json({ message: 'Transfer successful.' });
};
