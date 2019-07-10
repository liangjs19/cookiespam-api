const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();

exports.getRates = async (req, reply) => {
    try {
      const response = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_IO_KEY}&format=1`);
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  };

exports.getCurrencies = async (req, reply) => {
  try {
    const response = await fetch(`http://data.fixer.io/api/symbols?access_key=${process.env.FIXER_IO_KEY}&format=1`);
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

exports.getRatesbyCurrency = async (req, reply) => {
  try {
    const currencies = req.params['*'];
    console.log(req.params['*'])
    const response = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_IO_KEY}&symbols=${currencies}`);
    return response.json();
  } catch (error) {
    throw new Error(error);
  }  
}
