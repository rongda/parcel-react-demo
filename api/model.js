/* eslint-disable */
const mongoose = require('mongoose')
// 1. install MongoDB & net start MongoDB
// 2. connect
const uri = 'mongodb://127.0.0.1:27017'
mongoose.connect(uri, {
	dbName: "app-demo",    // db
	useNewUrlParser: true
}, err => {
	if (err) throw err
	console.log(`Successfully connected to mongo.`)
})

const models = {
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},
    // 头像
    'avatar': {type: String},
    // 个人简介或者职位简介
    'desc': {type: String},
    // title
    'title': {type: String},
    'avatar': {type: String},
    //  如果是你Boss 还有两个字段
    'company': {type: String},
    'money': {type: String}
  },
  chat: {}
}

for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports = {
  getModel: (name) => mongoose.model(name)
}
