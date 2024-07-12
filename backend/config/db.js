import mysql from 'mysql2/promise'

const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Dinh2202',
    database: 'prms'
    
};

const pool = mysql.createPool(connectionConfig);

export default pool;