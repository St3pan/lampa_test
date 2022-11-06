/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('exchangeRate', {
    id: 'id',
    currency: {
      type: 'varchar(255)',
      notNull: true
    },
    rate: {
      type: 'float',
      notNull: true,
    },
    createDate: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updateDate: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  });
};
