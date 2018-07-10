const express = require('express');
const mongoose = require('mongoose');
// 1. install MongoDB & net start MongoDB
// 2. connect
mongoose.connect('mongodb://127.0.0.1:27017');
mongoose.connection.on('connected', () => {
	console.log('mongo connect success');
})
// User
const User = mongoose.model('user', new mongoose.Schema({
	name: { type: String, required: true },
	age: { type: Number, required: true }
}))

// User.create({
// 	name: "Alin",
// 	age: 16
// }, (err, doc) => {
// 	if(!err) {
// 		console.log(doc)
// 	} else {
// 		console.log(err)
// 	}
// })

const app = express();
app.get('/api/test', (req, res) => {
	res.send({
		names: ['Lin', 'Wang', 'Jia'],
		universitys: ['清华大学','斯坦福大学','麻省理工大学']
	});
});
app.get('/api/user', (req, res) => {
	User.find({}, (err, doc) => {
		if(!err){
			res.json(doc)
		}
	})
})

module.exports = app;
