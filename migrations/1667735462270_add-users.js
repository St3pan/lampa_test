/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    email: {
      type: 'varchar(255)',
      notNull: true
    },
    password: {
      type: 'varchar(72)',
      notNull: true
    },
    createDate: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  });
};
