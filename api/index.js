const app = require('express')();

app.get('/api/test', function(req, res) {
	res.send({
		names: ['Lin', 'Wang', 'Jia'],
		universitys: ['清华大学','斯坦福大学','麻省理工大学']
	});
});

module.exports = app;
