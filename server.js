// * REQUIRING PACKAGES
const express = require('express'); // REQUIRING EXPRESS
const app = express(); // INSTANCE FOR EXPRESS
const cors = require('cors'); // CORS FOR CROSS ORIGIN CONNECTION
const path = require('path'); // DEFAULT NODE JS PATH LIBRARY
const https = require('https'); // HTTPS PROTOCOL LIBRARY
const fs = require('fs'); // FILE SYSTEM LIBRARY
// const db = require('./database/connection'); // DATABASE CONNECTION
// const cluster = require('cluster'); // CLUSTER MODULE FOR NODE JS APPLICATION
// const CPUs = require('os').cpus().length; // GIVE THE LENGTH OF CPUS WE HAVE

const PORT = process.env.PORT || 8080; // PORT

app.use( cors() );
app.use( express.json() );
app.use( express.static( path.join( __dirname, 'client' ) ) );

// SET MAXIMUM SOCKETS CONNECTIONS TO INFINITY
https.globalAgent.maxSockets = Infinity;

// CREATING HTTPS PROTOCOL SERVER
// const sslserver = https.createServer(
//     {
//         key: fs.readFileSync('client/SSL/key.pem'),
//         cert: fs.readFileSync('client/SSL/cert.pem')
//     },
//     app
// )

// CREATE TCP SOCKET
const io = require('socket.io')( app,
    {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    }
);

module.exports = io;

app.use( require('./routes/students') );

app.get("/", (req, res) => {

    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));

})

app.get("*", (req, res) => {

    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));

})

// if ( cluster.isMaster ) // CLUSTER PROCESS IS A MASTER PROCESS
// {
//     // IF TRUE
//     for 
//     (
//         let x = 0; x < CPUs; x++
//     )
//     {
//         cluster.fork(); // CREATE WORKERS EQUAL TO THE NUMBER OF CPUS WE HAVE
//     }

//     // WHEN A WORKER PROCESS IS DIED
//     cluster.on(
//         'exit', 
//         ( worker ) => {
//             console.log(`worker ${ worker.process.pid } died`);
//             cluster.fork(); // CREATING A NEW WORKER
//         }
//     );

// }else // CLUSTER PROCESS IS A WORKER (CHILD) PROCESS
// {
//     // IF FALSE
//     sslserver.listen(PORT, () => {
    
//         // console.log( sslserver.address() )
//         console.log("SERVER HAS BEEN STARTED WITH PROCESS ID: " + process.pid + " at ");
    
//     });

// }

app.listen(PORT, () => {
    
    console.log("SERVER HAS BEEN STARTED WITH PROCESS ID: " + process.pid + " at localhost:" + PORT);

});