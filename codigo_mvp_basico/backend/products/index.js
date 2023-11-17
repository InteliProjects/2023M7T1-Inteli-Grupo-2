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
 * Verify if products table exists
 * Create products table if not exists
 * Insert products into table
 * @param {object} connection - connection object with database information
 */
async function verifyProductsTable(connection) {
    let hasTable = await tableExists("products", connection);
    if (!hasTable) {
        const query = `
        CREATE TABLE products (
            id int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name varchar(255) NOT NULL,
            description varchar(1000) NOT NULL,
            type varchar(255) NOT NULL,
            price float(11) NOT NULL,
            available_quantity int(11) NOT NULL,
            image varchar(255) NOT NULL
        )
        `;

        try {
            await connection.promise().execute(query);

            const queries = [
                "INSERT INTO products (name, description, type, price, available_quantity, image) VALUES ('Maquininha Padrão', '3G e Wi-Fi; Aproximação (NFC); Pix na maquininha', 'stone', 538.8, 100, 'https://res.cloudinary.com/dunz5zfpt//f_auto,c_limit,w_256,q_auto/auto-credenciamento/autocred-maquininha-padrao.png')",
                "INSERT INTO products (name, description, type, price, available_quantity, image) VALUES ('Maquininha Smart', '3G e Wi-Fi; Aproximação (NFC) e Pix; Teclado touch; Integração com sistemas de vendas', 'stone', 598.8, 100, 'https://res.cloudinary.com/dunz5zfpt//f_auto,c_limit,w_128,q_auto/auto-credenciamento/autocred-maquininha-smart.png')",
                "INSERT INTO products (name, description, type, price, available_quantity, image) VALUES ('T1 Promo', 'Frete e troca gratis pra todo o Brasil; Receba suas vendas em 1 dia útil; Precisa de celular com internet; Receba por aproximação (NFC); Comprovante por SMS; Venda pelo App com TapTon, Link, Pix e Boleto', 'ton', 198.8, 100, 'https://res.cloudinary.com/dunz5zfpt/fl_progressive/f_auto,c_limit,w_128,q_100/site-ton/maquininhas/machine-t1-2')",
                "INSERT INTO products (name, description, type, price, available_quantity, image) VALUES ('T1 Chip Promo', 'Frete e troca gratis pra todo o Brasil; Receba suas vendas em 1 dia útil; Com Chip 2G e Wi-Fi; Receba por aproximação (NFC); Comprovante por SMS; Venda pelo App com TapTon, Link, Pix e Boleto', 'ton', 318.8, 100, 'https://res.cloudinary.com/dunz5zfpt/fl_progressive/f_auto,c_limit,w_128,q_100/site-ton/maquininhas/machine-t1-chip-2')",
                "INSERT INTO products (name, description, type, price, available_quantity, image) VALUES ('T2+ Promo', 'Frete e troca gratis pra todo o Brasil; Receba suas vendas em 1 dia útil; Com Chip 3G e Wi-Fi; Receba por aproximação (NFC); Comprovante por SMS; Venda pelo App com TapTon, Link, Pix e Boleto; Bateria de longa duração', 'ton', 478.8, 100, 'https://res.cloudinary.com/dunz5zfpt/fl_progressive/f_auto,c_limit,w_128,q_100/site-ton/maquininhas/machine-t2-2')",
                "INSERT INTO products (name, description, type, price, available_quantity, image) VALUES ('T3 Promo', 'Frete e troca gratis pra todo o Brasil; Receba suas vendas em 1 dia útil; Com Chip 3G e Wi-Fi; Receba por aproximação (NFC); Comprovante impresso ou SMS; Venda pelo App com TapTon, Link, Pix e Boleto; Aceita Pix QR Code na Maquininha', 'ton', 958.8, 100, 'https://res.cloudinary.com/dunz5zfpt/fl_progressive/f_auto,c_limit,w_128,q_100/site-ton/maquininhas/machine-t3-2')",
                "INSERT INTO products (name, description, type, price, available_quantity, image) VALUES ('T3 Smart Promo', 'Frete e troca gratis pra todo o Brasil; Receba suas vendas em 1 dia útil; Com Chip 4G e Wi-Fi; Receba por aproximação (NFC); Comprovante impresso ou SMS; Venda pelo App com TapTon, Link, Pix e Boleto; Bateria de longa duração; Aceita Pix QR Code na Maquininha', 'ton', 958.8, 100, 'https://res.cloudinary.com/dunz5zfpt/fl_progressive/f_auto,c_limit,w_128,q_100/site-ton/maquininhas/machine-t3-smart-2')"
            ];

            queries.forEach(async (query) => {
                await connection.promise().execute(query);
            });
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
 * Select products by type
 * @param {object} request - request object with product type
 * @param {object} response - response object
 * @returns {object} - response object (products)
 */
app.get("/products/:type", async (request, response) => {
    await verifyProductsTable(connection);
    const { type } = request.params;
    const query = `SELECT * FROM products WHERE type='${type}';`;

    connection.query(query, (error, result) => {
        if(error){
            console.log(error);
            response.status(500).send(error);
        } else {
            response.json(result);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;