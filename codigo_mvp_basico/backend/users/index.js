import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors";
import AWS from "aws-sdk";
import nodemailer from "nodemailer";

const app = express();
const port = 3333;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* 
    * Aws credentials to use SQS
*/
AWS.config.update({
    region: "",
    accessKeyId: "",
    secretAccessKey: "",
    sessionToken: ""
});

const sqs = new AWS.SQS();
const queueUrl = "https://sqs.us-east-1.amazonaws.com/605500781330/welcome-email";

/**
 * Nodemailer configuration to send emails
 */
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'nimbbbus@gmail.com',
      pass: 'ctov euiy fxjh raat',
    },
});

const receiveParams = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 20,
};
  
/**
 * Send email to user
 * @param {object} user - user object with email and message
 * @returns {object} - response object (message)
 */
const sendEmail = (user) => {
    const mailOptions = {
      from: 'nimbbbus@gmail.com',
      to: user.email,
      subject: 'Conta criada com sucesso!',
      text: user.message,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
};

/**
 * Send code to user via email
 * @param {object} user - user object with email and message
 * @returns {object} - response object (message)
 */
const sendCode = (user) => {
    const mailOptions = {
      from: 'nimbbbus@gmail.com',
      to: user.email,
      subject: 'Código de Verificação',
      text: user.message,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
};

/**
 * Poll queue to receive messages
 */
const pollQueue = () => {
    sqs.receiveMessage(receiveParams, (err, data) => {
      if (err) {
        console.error('Error receiving message:', err);
      } else if (data.Messages && data.Messages.length > 0) {
        const message = JSON.parse(data.Messages[0].Body);
        sendEmail(message);
        const deleteParams = {
          QueueUrl: queueUrl,
          ReceiptHandle: data.Messages[0].ReceiptHandle,
        };
        sqs.deleteMessage(deleteParams, (err) => {
          if (err) {
            console.error('Error deleting message:', err);
          }
        });
      } else {
        console.log('No messages available.');
      }
      pollQueue();
    });
};
  
pollQueue();

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
 * Verify if users table exists
 * Create users table if not exists
 * @param {object} connection - connection object with database information
 */
async function verifyUsersTable(connection) {
    let hasTable = await tableExists("users", connection);
    if (!hasTable) {
        const query = `
        CREATE TABLE users (
            id int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            password varchar(255) NOT NULL,
            phone varchar(255) NOT NULL,
            city varchar(255) NOT NULL,
            cnpj varchar(255) DEFAULT NULL,
            cpf varchar(255) DEFAULT NULL,
            working_hours varchar(255) NOT NULL,
            segment varchar(255) NOT NULL,
            revenue float(11) NOT NULL,
            code int(11) DEFAULT NULL
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
 * Insert new user into database
 * @param {object} request - request object with user data(name, email, password, phone, city)
 * @param {object} response - response object
 * @returns {object} - response object
 */
app.post("/users", async (request, response) => {
    await verifyUsersTable(connection);
    try {
        const { name, email, password, phone, city, cnpj, cpf, working_hours, segment, revenue} = request.body;
        const query = `INSERT INTO users (name, email, password, phone, city, cnpj, cpf, working_hours, segment, revenue) VALUES ('${name}', '${email}', '${password}', '${phone}', '${city}', '${cnpj}', '${cpf}', '${working_hours}', '${segment}', ${revenue})`;
        connection.query(query, (error, result) =>{
        if(error){
            console.log(error);
            response.status(500).send(error);
        } else {
            const user = {
                email: `${email}`,
                message: "Bem vindo ao nosso sistema!"
            };
            const params = {
                MessageBody: JSON.stringify(user),
                QueueUrl: queueUrl,
            };
            
            sqs.sendMessage(params, (error, data) => {
                if(error){
                    console.log(error);
                } else {
                    console.log("Mensagem enviada com sucesso!", data.MessageId);
                }
            });
            
            response.status(201).send(result);
        }
        });
    } catch (error) {
      response.status(error.status).json({ "mensage": error.mensage });
    }
});

/**
 * Get all users from database
 * @param {object} request - request object
 * @param {object} response - response object
 * @returns {object} - response object (users)
 */
app.get("/users", async (request, response) => {
    await verifyUsersTable(connection, "store");
    const query = "SELECT * FROM users;";

    connection.query(query, (error, result) => {
        if(error){
            console.log(error);
            response.status(500).send(error);
        } else {
            response.json(result);
        }
    });
});

/**
 * Get user by id from database
 * @param {object} request - request object with user id
 * @param {object} response - response object
 * @returns {object} - response object (user)
 */
app.get("/users/:id", (request, response) =>{
    const { id } = request.params;
    const query = `SELECT * FROM users WHERE id=${id}`;

    connection.query(query, (error, result) => {
        if(error){
            console.log(error);
        } else {
            response.json(result);
        }
    });
});

/**
 * Update user data in database
 * @param {object} request - request object with user data(id, name, email, password, phone, city, cnpj, cpf, working_hours, segment, revenue)
 * @param {object} response - response object
 * @returns {object} - response object (message)
 */
app.put("/users", (request, response) => {
    try {
        const { id, name, email, password, phone, city, cnpj, cpf, working_hours, segment, revenue } = request.body;

        const query = `UPDATE users SET name='${name}', email='${email}', password='${password}', phone='${phone}', city='${city}', cnpj='${cnpj}', cpf='${cpf}', working_hours='${working_hours}', segment='${segment}', revenue=${revenue} WHERE id=${id};`;

        connection.query(query, (error, result) => {
            if(error){
                console.log(error);
                response.send(error);
        } else {
            response.json({ message: "usuário atualizado com sucesso!" });
        }
        });
    } catch (error) {
        response.status(error.status).json({ "message": error });
    }
});

/**
 * Login user
 * @param {object} request - request object with user data(email, password)
 * @param {object} response - response object
 * @returns {object} - response object (user)
 */
app.post("/users/login", (request, response) => {
    const { email, password } = request.body;
    const query = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`;

    connection.query(query, (error, result) =>{
        if(error){
            response.send(error);
        } else {
            response.send(result);
        }
    });
});

/**
 * Update user code in database, which will be used to change password and verify user
 * @param {object} request - request object with user data(email, code)
 * @param {object} response - response object
 * @returns {object} - response object (message)
 */
app.post("/users/code", (request, response) => {
    const { email, code } = request.body;
    const query = `UPDATE users SET code='${code}' WHERE email='${email}'`;
    
    connection.query(query, (error, result) =>{
        if(error){
            response.send(error);
        } else {
            const user = {
                email: `${email}`,
                message: "Seu código é: " + code
            };
            sendCode(user);
            response.send(result);
        }
    });
});

/**
 * Update user password in database
 * @param {object} request - request object with user data(code, new password)
 * @param {object} response - response object
 * @returns {object} - response object (message)
 */
app.post("/users/confirm", (request, response) => {
    const {code, newPassword } = request.body;
    const query = `UPDATE users SET password='${newPassword}' WHERE code=${code}`;
    
    connection.query(query, (error, result) =>{
        if(error){
            response.send(error);
        } else {
            response.send(result);
        }
    });
});

/**
 * Delete user from database
 * @param {object} request - request object with user id
 * @param {object} response - response object
 * @returns {object} - response object (message)
 */
app.delete("/users/:id", (request, response) => {
    const { id } = request.params;

    const query = `DELETE FROM users WHERE id=${id}`;
    connection.query(query, (error, result) => {
        if(error){
            response.send(error);
        } else {
            response.send(result);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;