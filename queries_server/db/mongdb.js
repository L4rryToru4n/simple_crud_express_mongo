const mongoose = require('mongoose');
require('dotenv').config()

const MONGO_USERNAME = process.env.MONGODB_USERNAME;
const MONGO_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGO_CLUSTER = process.env.MONGODB_CLUSTER;
const MONGO_APPNAME = process.env.MONGODB_APPNAME;

const connect = mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.titgw.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=${MONGO_APPNAME}`)

module.exports = connect;