const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Config = require('../utils/config')

const option={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

mongoose.connect(Config.dbs, option,()=>{
});

const mySchema = new Schema({
    id:ObjectId,
    name: String,
    age: Number,
  });

  const User = mongoose.model('User', mySchema);
module.exports={
    User:User
};