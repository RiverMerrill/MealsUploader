var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;

// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/')))

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// })

app.listen(port, function(){
    console.log('app is listening on port 3000')
})