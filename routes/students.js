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

router.post('/studententry', 
( req, res ) => {

        const {
            studentName,
            FatherName,
            CNIC,
            MotherTongue,
            Occupation,
            MonthlyIncome,
            Surname,
            Religion,
            Gender,
            DateOfBirth,
            PlaceOfBirth,
            PreviousSchool,
            OfficeTelephone,
            ResidenceTelephone,
            Province,
            ResidentialAddress,
            date,
            time
        } = req.body;

        db.getConnection(
            ( err, connection ) => {
    
                if ( err )
                {
    
                    console.log( err );
                    res.send('Connection Failed');
    
                }else
                {
                    connection.query(
                        "INSERT INTO students (`student_name`, `father_name`, `father_cnic`, `mother_tongue`, `father_occupation`, `monthly_income`, `student_surname`, `religion`, `gender`, `date_of_birth`, `place_of_birth`, `previous_school`, `office_telephone`, `residence_telephone`, `province`, `residential_address`, `recording_date`, `recording_time`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [
                            studentName,
                            FatherName,
                            CNIC,
                            MotherTongue,
                            Occupation,
                            MonthlyIncome,
                            Surname,
                            Religion,
                            Gender,
                            DateOfBirth,
                            PlaceOfBirth,
                            PreviousSchool,
                            OfficeTelephone,
                            ResidenceTelephone,
                            Province,
                            ResidentialAddress,
                            date,
                            time
                        ],
                        ( err ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                                res.send( err );
                                connection.release();
                
                            }else 
                            {
                
                                res.send( 'success' );
                                connection.release();
                
                            }
                
                        }
                    );
                }
    
            }
        )

    }
)

module.exports = router;