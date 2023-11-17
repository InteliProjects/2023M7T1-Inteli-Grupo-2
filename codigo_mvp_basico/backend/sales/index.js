import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3333;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/**
 * Database connection information
 */
const connection = mysql.createConnection({
    host: "",
    database: "",
    user: "",
    password: ""
});

/**
 * Connect to database
 * Create database if not exists
 * @param {object} error - error object
 */
connection.connect((error) => {
    try {
        if (error) throw error;
        console.log('conectou ao db');
        connection.query("CREATE DATABASE IF NOT EXISTS store");
        connection.query("USE store");
    } catch (error) {
        console.log(error);
    }
});

/**
 * Verify if sales table exists
 * Create sales table if not exists
 * @param {object} connection - connection object with database information
 */
async function verifySalesTable(connection) {
    let hasTable = await tableExists("sales", connection);
    if (!hasTable) {
        const query = `
        CREATE TABLE sales (
            id int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            idProducts varchar(255) NOT NULL,
            idUser int(11) NOT NULL,
            value float(11) NOT NULL,
            status varchar(255) NOT NULL
        )
        `;

        try {
        await connection.promise().execute(query);
        } catch (error) {
        console.error("Error creating table:", error.message);
        }
    }
}

/**
 * Verify if table exists
 * @param {string} tableName - table name
 * @param {object} connection - connection object with database information
 * @returns {boolean} - true if table exists, false if not
 */
async function tableExists(tableName, connection) {
    const query = `SHOW TABLES LIKE ?`;
    const [rows] = await connection.promise().query(query, [tableName]);
    return rows.length > 0;
}

/**
 * Insert new sale into database
 * @param {object} request - request object with sale data(idProduct, idUser, value, status)
 * @param {object} response - response object
 * @returns {object} - response object
 */
app.post("/sales", async (request, response) => {
    await verifySalesTable(connection);
    try {
        const { idProducts, idUser, value, status } = request.body;
        const query = `INSERT INTO sales(idProducts,idUser,value,status) VALUE ('${idProducts}','${idUser}','${value}','${status}')`;

        connection.query(query, (error, result) =>{
        if(error){
            console.log(error);
            response.status(500).send(error);
        } else {
            response.status(201).send(result);
        }
        });
    } catch (error) {
      response.status(error.status).json({ "mensage": error.mensage });
    }
});

/**
 * Updates sale status in database
 * @param {object} request - request object with sale data(id, idProduct, idUser, value, status)
 * @param {object} response - response object
 * @returns {object} - response object (message)
 */
app.put("/sales", (request, response) => {
    try {
        const { id, idProducts, idUser, value, status } = request.body;

        const query = `UPDATE sales SET idProducts='${idProducts}', idUser='${idUser}', value='${value}', status='${status}' WHERE id=${id};`;

        connection.query(query, (error, result) => {
            if(error){
                console.log(error);
                response.send(error);
        } else {
            response.json({ message: "venda atualizada com sucesso!" });
        }
        });
    } catch (error) {
        response.status(error.status).json({ "message": error });
    }
});

/**
 * Delete sale from database
 * @param {object} request - request object with sale id
 * @param {object} response - response object
 * @returns {object} - response object (message)
 */
app.delete("/sales/:id", (request, response) => {
    const { id } = request.params;

    const query = `DELETE FROM sales WHERE id=${id}`;
    connection.query(query, (error, result) => {
        if(error){
            response.send(error);
        } else {
            response.send(result);
        }
    });
});

/**
 * Get sales by user id from database
 * @param {object} request - request object with user id
 * @param {object} response - response object
 * @returns {object} - response object (sales)
 */
app.get("/sales/:id", (request, response) =>{
    const { id } = request.params;
    const query = `SELECT * FROM sales WHERE idUser=${id} AND status='processando'`;

    connection.query(query, (error, result) => {
        if(error){
            console.log(error);
        } else {
            response.json(result);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;