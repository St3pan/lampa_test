module.exports = (app) => {
  const db = app.get('db');
  const { exchangeRate } = db;
  const module = {};

  // Get Single Exchange Rate

  module.getOneByCurrency = async (currency) => exchangeRate.find({ currency }, { single: true });

  return module;
};
