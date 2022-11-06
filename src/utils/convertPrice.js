const convertSingleProduct = (product, rate) => ({
  ...product,
  price: parseFloat((product.price / rate).toFixed(2))
});

const convertArrayOfProducts = (products, rate) => products.map(
  (product) => convertSingleProduct(product, rate)
);

module.exports = {
  convertSingleProduct,
  convertArrayOfProducts,
};
