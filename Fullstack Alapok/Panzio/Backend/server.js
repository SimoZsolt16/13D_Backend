const cors = require('cors');
const mysql = require('mysql');
const express = require('express');
const config = require('./config.js');

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
});

app.listen(config.SV_PORT, config.SV_HOST, () => {
    console.log("Server started.");
});


app.get("/api/szobak", (require, response) => {
    const sql = "SELECT sznev, agy + potagy AS osszes_agy FROM szobak";

    db.query(sql, (error, results) => {
        if (error) {
            return response.json(error);
        }

        return response.json(results);
    })
})

app.get("/api/foglalasok", (require, response) => {
    const sql = "SELECT f.*, v.vnev FROM foglalasok f JOIN vendegek v ON f.vendeg = v.vsorsz";

    db.query(sql, (error, results) => {
        if (error) {
            return response.json(error);
        }

        return response.json(results);
    })
})