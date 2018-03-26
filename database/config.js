let Sequelize = require('sequelize');
let _db = {};

let db = new Sequelize('aes_db', null, null, {
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    operatorsAliases: false,
    storage: './database/base/mytd.sqlite'
});

_db.db = db;

module.exports = _db;