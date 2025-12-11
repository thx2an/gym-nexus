const { Sequelize } = require('sequelize');
const config = require('./config/database');

console.log('--- Testing DB Connection ---');
console.log('Config:', {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    database: config.database,
    username: config.username
});

const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        process.exit(0);
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err.message);
        if (err.original) console.error('Original Error:', err.original.message);
        process.exit(1);
    });
