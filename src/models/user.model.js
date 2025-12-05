const connection = require('./connection');
const camelize = require('camelize');

const createUsers = async (user) => {
    const { userName, password } = user;
    const query = 'INSERT INTO users (user_name, password) VALUES (?, ?);';
    const values = [userName, password];
    const [{ insertId }] = await connection.execute(query, values);
    return insertId;
};

const findUserByid = async (userId) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    const values = [userId];
    const [[user]] = await connection.execute(query, values);
    return camelize(user);
};

const findUserByName = async (userName) => {
    const query = 'SELECT * FROM users WHERE user_name = ?;';
    const values = [userName];
    const [[user]] = await connection.execute(query, values);
    return camelize(user); 
};

module.exports = {
    createUsers,
    findUserByid,
    findUserByName,
};