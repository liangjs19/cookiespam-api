const mongoose = require('mongoose');


exports.rates = mongoose.model('rates', new mongoose.Schema(), 'rates')
exports.currency = mongoose.model('currency', new mongoose.Schema(), 'currency')