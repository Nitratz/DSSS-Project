let Sequelize = require('sequelize');
let config = require('./config');
let models = {};

let Account = config.db.define( 'account', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.TEXT,
    },
    password: {
        type: Sequelize.TEXT,
    },
    birthdate: {
        type: Sequelize.DATE,
    },
    city: {
        type: Sequelize.TEXT,
    },
});

let Training = config.db.define( 'training', {
    id_account: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    start: {
        type: Sequelize.DATE,
    },
    stop: {
        type: Sequelize.DATE,
    },
    description: {
        type: Sequelize.TEXT,
    }
});

let Weight = config.db.define( 'weight', {
    id_account: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    time: {
        type: Sequelize.DATE,
    },
    weight: {
        type: Sequelize.INTEGER,
    }
});

models.account = Account;
models.training = Training;
models.weight = Weight;

module.exports = models;