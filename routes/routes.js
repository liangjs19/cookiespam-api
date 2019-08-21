const fetch = require("node-fetch");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const models = require("../models/models.js");
mongoose.Promise = global.Promise;
dotenv.config();

const connect = async () => {
  await mongoose.connect("mongodb://localhost/currency", {
    useNewUrlParser: true
  });
};

connect().catch(error => console.error(error.stack));

const getRates = async () => {
  try {
    // const response = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_IO_KEY}&format=1`);
    const response = await models.rates
    .find()
    .sort({ timestamp: -1 })
    .limit(1);

    if (Array.isArray(response)){
      return response[0];
    }

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const getCurrencies = async () => {
  try {
    // const response = await fetch(
    //   `http://data.fixer.io/api/symbols?access_key=${
    //     process.env.FIXER_IO_KEY
    //   }&format=1`
    // );
    const response = await models.currency.findOne();
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const appRouter = function(app) {
  app.get("/rates", function(req, res) {
    getRates().then(json => {
      res.status(200).send(json);
    });
  });
  app.get("/currencylist", function(req, res) {
    getCurrencies().then(json => {
      res.status(200).send(json);
    });
  });
  app.get("/currencylistbysymbols/*", function(req, res) {
    getRatesbyCurrency(req.params["0"]).then(json => {
      res.status(200).send(json);
    });
  });
};

module.exports = appRouter;
