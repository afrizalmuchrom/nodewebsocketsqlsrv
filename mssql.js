
const config = {
    user: 'focus',
    password: 'dsi12345A',
    server: '172.23.83.105', // You can use 'localhost\\instance' to connect to named instance WIN-6OLA1571GHL
    database: 'focus',
    "options": {
        "encrypt": false,
        "enableArithAbort": true
        }
}


const sql = require('mssql/msnodesqlv8');
// const sql = require('mssql');

const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();
const server      = require('http').Server(app);
const io          = require('socket.io')(server);



//konfigurasi
app.use(bodyParser.urlencoded({ extended: true}));
app.use(function(req,res,next){
    req.io = io;
    next();
})

//file lokasi
// app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendfile('index.html');

});

// app.get('/getexc/:tgl/:bulan/:tahun/:pit', function(req, res) {

// (async function () {
//     try {
//         let pool = await sql.connect(config);
//         let result1 = await pool.request()
//             .input('tgl', sql.Int, req.params.tgl)
//             .input('bulan', sql.Int, req.params.bulan)
//             .input('tahun', sql.Int, req.params.tahun)
//             .input('pit', sql.VarChar, req.params.pit)
//             .query('select * from Tabel_Op_Unit_Set where tgl=@tgl and bulan=@bulan and tahun=@tahun and area=@pit');
           
            
       
//         res.send(result1.recordset);
        
        

//         io.on('connection', function (socket) {

//             socket.emit('vote', result1.recordset);
        
//         });
       

       
//         // Stored procedure
        
//         // let result2 = await pool.request()
//         //     .input('input_parameter', sql.Int, value)
//         //     .output('output_parameter', sql.VarChar(50))
//         //     .execute('procedure_name')
        
//         // console.dir(result2)
//     } catch (err) {
//         console.log(err)
//     }
// })()


// });


// app.get('/senddata/:tes', function(req, res) {
    
    io.on('connection', function (socket) {

 
    (async function () {
        try {
            var area = 'B1';
            
            let pool = await sql.connect(config);
            let result1 = await pool.request()
            .input('area', sql.VarChar, area)
            .query('select * from Tabel_Op_Unit_Set where tgl=7 and bulan=12 and tahun=2020 and area=@area');

            let cek = await pool.request()
            .input('area', sql.VarChar, area)
            .input('strip', sql.VarChar, '-')
            .query('select count(nama) as cek from Tabel_Op_Unit_Set where tgl=7 and bulan=12 and tahun=2020 and area=@area and nama=@strip ');
            
            
           

            setInterval(() => {
            console.log(cek.recordset[0].cek);

                if(cek.recordset[0].cek == 4){

                }else{
            
                    socket.emit('vote', result1.recordset);

                }
                
            }, 10000);

             socket.emit('vote', result1.recordset);
            console.log('run')
    
        } catch (err) {
            console.log(err)
        }
    })()
    
    });
    
    

// });

 // Start
 server.listen(3000);
 console.log('Open http://localhost:3000');



 
