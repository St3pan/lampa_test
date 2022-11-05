const { validatePagination } = require('../../utils/validator');

module.exports = (app) => {
  const db = app.get('db');
  const { categories, products } = db;
  const module = {};

  // Get Categories

  module.get = async (params) => {
    const { limit, page } = validatePagination(params);
    return categories.find({}, {
      offset: limit * page,
      limit,
    });
  };

  // Get Single Category

  module.getOne = async (id) => categories.findOne({ id });

  // Get All Products in Category

  module.getCategoryProducts = async (id, params) => {
    const { limit, page } = validatePagination(params);
    const categoryProducts = await products.find({ categoryId: id }, {
      limit,
      offset: limit * page,
      fields: ['id', 'price', 'title', 'mainPhoto', 'createDate']
    });
    const category = await categories.findOne({ id });
    return {
      category,
      products: categoryProducts
    };
  };

  // Delete Category

  module.delete = async (id) => categories.destroy({ id }, { single: true });

  // Update Category

  module.update = async (id, row) => {
    delete row.id;
    return categories.update({ id }, row, { single: true });
  };

  // Create Category

  module.create = async (row) => {
    if (!row) throw new Error('No row data given');
    delete row.id;
    const category = await categories.save({ ...row });
    return { id: category.id };
  };

  return module;
};
