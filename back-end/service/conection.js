import mysql from 'mysql'

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_mgl'
})

export default db;