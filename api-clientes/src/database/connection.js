require('dotenv').config()
const knex = require('knex')
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

const connection = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
})

module.exports = connection