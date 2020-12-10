var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();
var server      = require('http').Server(app);
var io          = require('socket.io')(server);


//konfigurasi
app.use(bodyParser.urlencoded({ extended: true}));
app.use(function(req,res,next){
    req.io = io;
    next();
})

//file lokasi
// app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    // res.sendfile('index.html');
    res.send(`
    <!DOCTYPE html>
    <html>
    <body>
    <script>
        let test = 'xxxx';
          console.log(${ "test" /* this can be variable instead */ });
        </script>
     </body>
     </html>
`);
});

// Start
server.listen(3000);
console.log('Open http://localhost:3000');