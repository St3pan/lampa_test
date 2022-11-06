const axios = require('axios');

const USD = 'USD';
const EUR = 'EUR';

const apiURL = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

module.exports = async (app) => {
  const db = app.get('db');
  const { exchangeRate } = db;

  const { data } = await axios.get(apiURL);
  const apiUSD = data.find((currency) => currency.ccy === USD);
  const apiEUR = data.find((currency) => currency.ccy === EUR);

  const usdTotal = await exchangeRate.count({ currency: USD });
  const eurTotal = await exchangeRate.count({ currency: EUR });

  if (typeof apiUSD === 'object' && apiUSD.sale) {
    const usdRate = parseFloat(apiUSD.sale).toFixed(2);
    if (usdTotal === '0') {
      await exchangeRate.save({ currency: USD, rate: usdRate });
    } else {
      await exchangeRate.update({ currency: USD }, { rate: usdRate });
    }
  }

  if (typeof apiEUR === 'object' && apiEUR.sale) {
    const eurRate = parseFloat(apiEUR.sale).toFixed(2);
    if (eurTotal === '0') {
      await exchangeRate.save({ currency: EUR, rate: eurRate });
    } else {
      await exchangeRate.update({ currency: EUR }, { rate: eurRate });
    }
  }
};
