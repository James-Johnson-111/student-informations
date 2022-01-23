const express = require('express');
const router = express.Router();
const db = require('../database/connection'); // DATABASE CONNECTION
const io = require('../server');

let clients = [];

io.on(
    'connection', ( socket ) => {
        
        clients.push(
            {
                id: socket.id
            }
        )

        console.log('New Connection');
        console.log(
            'Clients', clients
        )

        socket.on(
            'disconnect', () => {

                const presentUser = clients.find(client => client.id == socket.id);
                clients = clients.filter(client => client != presentUser);

                console.log('Connection Lost');
                console.log(
                    "Clients", clients
                )

            }
        )
        
        socket.on(
            'students/list', () => {

                db.getConnection(
                    ( err, connection ) => {
            
                        if ( err )
                        {
            
                            socket.emit('students/list', { data: [], err: err });
                            connection.release();
            
                        }else
                        {
                            connection.query(
                                "SELECT * FROM students",
                                ( err, rslt ) => {
                        
                                    socket.emit('students/list', { data: rslt, err: err });
                                    connection.release();
                        
                                }
                            );
                        }
            
                    }
                )

            }
        );

        socket.on(
            'students/list/search', ( req ) => {

                db.getConnection(
                    ( err, connection ) => {
            
                        if ( err )
                        {
            
                            socket.emit('students/list/search', { data: [], err: err });
            
                        }else
                        {
                            connection.query(
                                "SELECT * FROM students WHERE student_name LIKE '%" + req.body + "%'",
                                ( err, rslt ) => {
                        
                                    socket.emit('students/list/search', { data: rslt, err: err });
                                    connection.release();
                        
                                }
                            );
                        }
            
                    }
                )

            }
        )
        
});

module.exports = router;