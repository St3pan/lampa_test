const Router = require('express-promise-router');
const _ = require('lodash');
const Products = require('../components/products');
const { authenticate } = require('../components/auth/helpers');

module.exports = (app) => {
  const router = Router();
  const products = Products(app);

  // Get Products

  router.get('/', async (req, res) => {
    const params = req.query;
    const data = await products.get(params);
    res.json(data);
  });

  // Get Single Product

  router.get('/:id(\\d+)', async (req, res) => {
    const { id } = req.params;
    const data = await products.getOne(id);
    res.json(data);
  });

  // Delete Product

  router.delete('/:id(\\d+)', authenticate, async (req, res) => {
    const data = await products.delete(req.params.id);
    res.json(data);
  });

  // Update Product

  router.put('/:id(\\d+)', authenticate, async (req, res) => {
    const productBody = _.pick(req.body, 'price', 'title', 'description', 'mainPhoto', 'photos', 'currency', 'createDate', 'categoryId');
    const data = await products.update(req.params.id, productBody);
    res.json(data);
  });

  // Create Product

  router.post('/', authenticate, async (req, res) => {
    const productBody = _.pick(req.body, 'price', 'title', 'description', 'mainPhoto', 'photos', 'currency', 'createDate', 'categoryId');
    const data = await products.create(productBody);
    res.json(data);
  });

  return Router().use('', router);
};
