var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/')))

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// })

app.listen(3000, function(){
    console.log('app is listening on port 3000')
})