const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECT_STRING);
        console.log('Connect success!');
    } catch (error) {
        console.log(`Connection error: ${error}`);
    }
}

module.exports = connect;