const axios = require('axios');

const availableCurrencies = ['USD', 'EUR'];

const apiURL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

module.exports = async (app) => {
  const db = app.get('db');
  const { exchangeRate } = db;

  const { data } = await axios.get(apiURL);

  await Promise.all(availableCurrencies.map(async (currency) => {
    const apiCurrency = data.find((c) => c.ccy === currency);

    if (typeof apiCurrency === 'object' && apiCurrency.sale) {
      const count = await exchangeRate.count({ currency });
      const rate = parseFloat(apiCurrency.sale).toFixed(2);
      if (count === '0') {
        await exchangeRate.save({ currency, rate });
      } else {
        await exchangeRate.update({ currency }, { rate });
      }
    }
  }));
};
