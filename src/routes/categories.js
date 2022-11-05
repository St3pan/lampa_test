const Router = require('express-promise-router');
const _ = require('lodash');
const Categories = require('../components/categories');

module.exports = (app) => {
  const router = Router();
  const categories = Categories(app);

  // Get Categories

  router.get('/', async (req, res) => {
    const params = req.query;
    const data = await categories.get(params);
    res.json(data);
  });

  // Get Single Category

  router.get('/:id(\\d+)', async (req, res) => {
    const { id } = req.params;
    const data = await categories.getOne(id);
    res.json(data);
  });

  // Get All Products in Category

  router.get('/:id(\\d+)/product', async (req, res) => {
    const { id } = req.params;
    const params = req.query;
    const data = await categories.getCategoryProducts(id, params);
    res.json(data);
  });

  // Delete Category

  router.delete('/:id(\\d+)', async (req, res) => {
    const data = await categories.delete(req.params.id);
    res.json(data);
  });

  // Update Category

  router.put('/:id(\\d+)', async (req, res) => {
    const data = await categories.update(req.params.id, _.pick(req.body, 'title', 'createDate'));
    res.json(data);
  });

  // Create Category

  router.post('/', async (req, res) => {
    const data = await categories.create(_.pick(req.body, 'title', 'createDate'));
    res.json(data);
  });

  return Router().use('/category', router);
};
