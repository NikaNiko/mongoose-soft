const mongoose = require('mongoose');
const lib = require('../../src');

mongoose.Promise = Promise;

const db = mongoose.createConnection('mongodb://localhost:27017/acl');
const schema = new mongoose.Schema({ text: String });
schema.plugin(lib());
db.model('posts', schema);

module.exports = db;
