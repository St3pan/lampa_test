require('dotenv').config();

const DB = require('../src/services/db');
const { createHash } = require('../src/components/auth/helpers');

const tableCategories = 'categories';
const tableProducts = 'products';
const tableUsers = 'users';
const tableExchangeRate = 'exchangeRate';

const createRecord = (db, table, data) => db[table].insert(data);

function openDB() {
  console.log('Connecting to the DB');
  return DB();
}

function seedCategories(db) {
  console.log('Seeding [categories]...');
  const records = [];
  try {
    for (let i = 1; i <= 15; i += 1) {
      const category = {
        title: `Category #${i}`,
        createDate: new Date(Date.now() - 100000 * i), // Time difference for sorting
      };
      records.push(createRecord(db, tableCategories, category));
    }
  } catch (e) {
    console.error(e);
  }

  return Promise.all(records);
}

function seedProducts(db, categories) {
  console.log('Seeding [products]...');
  const records = [];
  try {
    categories.forEach((category) => {
      for (let i = 1; i <= 15; i += 1) {
        const product = {
          price: (Math.random() * 100).toFixed(2),
          title: `Title for Product #${i} in Category #${category.id}`,
          description: `Description for Product #${i} in Category #${category.id}`,
          mainPhoto: 'https://example.com/images/1.jpg',
          photos: JSON.stringify(['https://example.com/images/2.jpg', 'https://example.com/images/2.jpg', 'https://example.com/images/3.jpg']),
          currency: 'UAH',
          createDate: new Date(Date.now() - 100000 * i), // Time difference for sorting
          categoryId: category.id,
        };
        records.push(createRecord(db, tableProducts, product));
      }
    });
  } catch (e) {
    console.error(e);
  }

  return Promise.all(records);
}

function seedUsers(db) {
  console.log('Seeding [users]...');
  const records = [
    {
      email: 'admin@email.com',
      password: createHash('password'),
    }
  ];

  return db[tableUsers].insert(records);
}

function seedExchangeRate(db) {
  console.log('Seeding [exchangeRate]');
  const records = [
    {
      currency: 'USD',
      rate: 39.99
    },
    {
      currency: 'EUR',
      rate: 39.20
    }
  ];

  return db[tableExchangeRate].insert(records);
}

function seed(db) {
  return seedCategories(db)
    .then((categories) => seedProducts(db, categories)
      .then(() => seedUsers(db))
      .then(() => seedExchangeRate(db))
      .then(() => console.log('Successfully completed the seeding process')));
}

openDB().then((db) => seed(db.db));
