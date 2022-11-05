const { validateProductInput, validatePagination, validateSorting } = require('../../utils/validator');

module.exports = (app) => {
  const db = app.get('db');
  const { products } = db;
  const module = {};

  // Get Products

  module.get = async (params) => {
    const { limit, page } = validatePagination(params);
    const { orderBy, direction } = validateSorting(params);
    return products.find({}, {
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
  };

  // Get Single Product

  module.getOne = async (id) => products.findOne({ id }, {
    fields: ['id', 'price', 'title', 'description', 'mainPhoto', 'photos', 'createDate']
  });

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
