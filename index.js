var stockRepository = require('./stockRepository')();
var app = require('./app')(stockRepository);

var listenPort = process.env.PORT || 3000;

app.listen(listenPort, function () {
    console.log('Example app listening on port ' + listenPort + '!');
});
