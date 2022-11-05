/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('products', {
    id: 'id',
    price: {
      type: 'float',
      notNull: true
    },
    title: {
      type: 'text',
      notNull: true
    },
    description: {
      type: 'text',
      notNull: false
    },
    mainPhoto: {
      type: 'text',
      notNull: true,
    },
    photos: {
      type: 'jsonb',
      notNull: false
    },
    currency: {
      type: 'text',
      notNull: true,
      default: 'UAH'
    },
    createDate: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    categoryId: {
      type: 'integer',
      references: 'categories',
      onDelete: 'cascade'
    }
  });
};
