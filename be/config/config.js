require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME || 'sa',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE || 'GymNexus',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 1433,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: false,
                trustServerCertificate: true
            }
        },
        timezone: '+07:00',
        logging: false
    },
    test: {
        username: process.env.DB_USERNAME || 'sa',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE || 'GymNexus',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 1433,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: false,
                trustServerCertificate: true
            }
        },
        timezone: '+07:00'
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 1433,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true,
                trustServerCertificate: false
            }
        },
        timezone: '+07:00'
    }
};
