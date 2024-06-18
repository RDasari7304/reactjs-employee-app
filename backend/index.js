const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 9000;

app.use(cors());
app.use(bodyParser.json());

const conn  = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

const queryDB = (query) => {
    return new Promise((resolve, reject) => {
        conn.query(query, (err, result) => {
            if(err) reject(err);
            
            resolve(result);
        });
    })
}

conn.connect((err) => {
    if(err) throw err;
    console.log("Connected to database server.");
});

app.put('/update/:tableName/:id', async (req, res) => {
    const {tableName, id} = req.params;
    const {data} = req.body;

    try{
        console.log(data);
         const updateStatement = Object.entries(data).map(([key, value]) => {
            
            return `${key} = "${value}"`
         }).join(', ');
         
         const sqlQuery = `UPDATE mysql.${tableName} set ${updateStatement} WHERE id = ${id}`;
         const result = await queryDB(sqlQuery);
         res.status(200).json(result);
    }catch(err){
        console.log('Database update failed: ', err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/insert/:tableName', async (req, res) => {
    const {tableName} = req.params;
    const {data} = req.body;

    try{
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map((value) => `"${value}"`).join(',');

        const sql = `INSERT INTO mysql.${tableName}(${columns}) values(${values})`;
        const result = await queryDB(sql);
        res.status(200).json(result);
    }catch(err){
        console.log(`Database entry failed: `, err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/query/:tableName', async (req, res) => {
    const {tableName} = req.params;

    const validTableName  = /^[a-zA-Z_]+$/.test(tableName);
    console.log(validTableName);
    if(!validTableName){
        res.status(400).send("Invalid table name");
    }

    try{
        const sql = `SELECT * FROM mysql.${tableName}`;
        const result = await queryDB(sql);
        res.json(result);
    }catch(err){
        console.log(`Database query failed: `, err);
        res.status(500).send('Internal Server Error');
    }
});

app.delete('/delete/:tableName/:id', async(req, res) => {
    const {tableName, id} = req.params;

    try{
        const sql = `DELETE from mysql.${tableName} where id = ${id}`;
        const result = await queryDB(sql);
        res.status(200).json(result);
    }catch(err){
        console.log('Database deletion failed', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

