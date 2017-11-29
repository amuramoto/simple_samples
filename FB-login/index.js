var express = require('express');
var app = express();

app.listen(1337 || process.env.PORT);
app.use('/', express.static(__dirname));