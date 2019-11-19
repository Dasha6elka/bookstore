const mysql = require("mysql2/promise");

let connection = null;

async function getConnection() {
    if (!connection) {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DB,
        });
    }
    return connection;
}

module.exports = getConnection;
