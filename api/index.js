const app = require('express')();

app.get('/api/test', function(req, res) {
	res.send('Hello World');
});

module.exports = app;
