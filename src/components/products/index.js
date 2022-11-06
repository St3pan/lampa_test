const {
  validateProductInput, validatePagination, validateSorting, validateCurrency
} = require('../../utils/validator');
const { convertArrayOfProducts, convertSingleProduct } = require('../../utils/convertPrice');
const ExchangeRate = require('../exchangeRate');

module.exports = (app) => {
  const db = app.get('db');
  const { products } = db;
  const exchangeRate = ExchangeRate(app);
  const module = {};

  // Get Products

  module.get = async (params) => {
    const { limit, page } = validatePagination(params);
    const { orderBy, direction } = validateSorting(params);
    const currency = validateCurrency(params);
    let dbProducts = await products.find({}, {
      offset: limit * page,
      limit,
      fields: ['id', 'price', 'title', 'mainPhoto', 'createDate'],
      order: [
        {
          field: orderBy,
          direction,
        }
      ]
    });
    if (currency) {
      const dbCurrency = await exchangeRate.getOneByCurrency(currency);
      dbProducts = convertArrayOfProducts(dbProducts, dbCurrency.rate);
    }
    return dbProducts;
  };

  // Get Single Product

  module.getOne = async (id, params) => {
    const currency = validateCurrency(params);
    let product = await products.findOne({ id }, {
      fields: ['id', 'price', 'title', 'description', 'mainPhoto', 'photos', 'createDate']
    });
    if (currency) {
      const dbCurrency = await exchangeRate.getOneByCurrency(currency);
      product = convertSingleProduct(product, dbCurrency.rate);
    }
    return product;
  };

  // Delete Product

  module.delete = async (id) => products.destroy({ id }, { single: true });

  // Update Product

  module.update = async (id, row) => {
    const product = validateProductInput(row);
    return products.update({ id }, product, { single: true });
  };

  // Create Product

  module.create = async (row) => {
    const product = validateProductInput(row);
    const { id } = await products.save(product);
    return { id };
  };
  return module;
};
