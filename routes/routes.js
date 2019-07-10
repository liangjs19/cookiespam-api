const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();

const getRates = async () => {
    try {
      const response = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_IO_KEY}&format=1`);
      return response.json();
    } catch (error) {
      throw new Error(error);
    }
  };

const getCurrencies = async () => {
  try {
    const response = await fetch(`http://data.fixer.io/api/symbols?access_key=${process.env.FIXER_IO_KEY}&format=1`);
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

const getRatesbyCurrency = async (currencies) => {
  try {
    const response = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_IO_KEY}&symbols=${currencies}`);
    return response.json();
  } catch (error) {
    throw new Error(error);
  }  
}

var appRouter = function (app) {
    app.get("/rates", function(req, res) {
      getRates().then((json) => {
        res.status(200).send(json);
      })
    });
    app.get("/currencylist", function(req, res) {
      getCurrencies().then((json) => {
        res.status(200).send(json);
      })
    });
    app.get("/currencylistbysymbols/*", function(req, res) {
      getRatesbyCurrency(req.params['0']).then((json) => {
        res.status(200).send(json);
      })
    });
  }
  
module.exports = appRouter;