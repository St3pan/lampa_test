const validateProductInput = (row) => {
  const { price, photos } = row;
  if (!row) throw new Error('No row data given');
  if (price && !Number(price)) throw new Error('Price must be a number');
  if (photos && !Array.isArray(photos)) throw new Error('Photos must be an array');
  else if (photos) row.photos = JSON.stringify(photos);
  else delete row.photos;
  delete row.id;
  return row;
};

const validatePagination = (params) => {
  const { limit = 10 } = params;
  let { page = 1 } = params;
  if (limit && !Number(limit)) throw new Error('Limit must be a number');
  if (page && !Number(page)) throw new Error('Page must be a number');
  if (page > 0) page -= 1;
  return { page, limit };
};

const validateSorting = (params) => {
  let { orderBy = 'id', direction = 'asc' } = params;
  if (orderBy !== 'id' && orderBy !== 'price' && orderBy !== 'createDate') orderBy = 'id';
  if (direction !== 'asc' && direction !== 'desc') direction = 'asc';
  return { orderBy, direction };
};

module.exports = {
  validateProductInput,
  validatePagination,
  validateSorting
};
