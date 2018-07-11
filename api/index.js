/* eslint-disable */
/* nodemon  */
const app = require('express')()
const mongoose = require('mongoose')
// 1. install MongoDB & net start MongoDB
// 2. connect
const uri = 'mongodb://127.0.0.1:27017'
mongoose.connect(uri, {
	dbName: "test",    // db
	useNewUrlParser: true
}, err => {
	if (err) throw err
	console.log(`Successfully connected to mongo.`)
})

// User
const User = mongoose.model('user', new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	}
}))

// User.create({
// 	name: "Roda",
// 	age: 16
// }, (err, doc) => {
// 	if(!err) {
// 		console.log(doc)
// 	} else {
// 		console.log(err)
// 	}
// })

app.get('/api/test', (req, res) => {
	res.send({
		names: ['Lin', 'Wang', 'Jia'],
		universitys: ['清华大学','斯坦福大学','麻省理工大学']
	})
})
app.get('/api/user', (req, res) => {
	User.find({}, (err, doc) => {
		if(!err){
			res.json(doc)
		}
	})
})

module.exports = app
