const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');
const db = require('./database/connection');

const PORT = process.env.PORT || 8080;

app.use( cors() );
app.use( express.json() );
app.use( express.static( path.join( __dirname, 'client' ) ) );

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

app.get("/", (req, res) => {

    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));

})

app.post('/studententry', 
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

app.get('/students/list', 
    ( req, res ) => {

        db.getConnection(
            ( err, connection ) => {
    
                if ( err )
                {
    
                    console.log( err );
                    res.send('Connection Failed');
    
                }else
                {
                    connection.query(
                        "SELECT * FROM students",
                        ( err, rslt ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                                res.send( err );
                                connection.release();
                
                            }else 
                            {
                
                                res.send( rslt );
                                connection.release();
                
                            }
                
                        }
                    );
                }
    
            }
        )

    }
)

app.post('/students/student/', 
    ( req, res ) => {

        const { registration } = req.body;

        db.getConnection(
            ( err, connection ) => {
    
                if ( err )
                {
    
                    console.log( err );
                    res.send('Connection Failed');
    
                }else
                {
                    connection.query(
                        "SELECT * FROM students WHERE student_id = " + registration,
                        ( err, rslt ) => {
                
                            if( err )
                            {
                
                                console.log( err );
                                res.send( err );
                                connection.release();
                
                            }else 
                            {
                
                                res.send( rslt );
                                connection.release();
                
                            }
                
                        }
                    );
                }
    
            }
        )

    }
)

app.post('/students/student/edit', 
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
            registration
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
                        "UPDATE students SET `student_name` = ?, `father_name` = ?, `father_cnic` = ?, `mother_tongue` = ?, `father_occupation` = ?, `monthly_income` = ?, `student_surname` = ?, `religion` = ?, `gender` = ?, `date_of_birth` = ?, `place_of_birth` = ?, `previous_school` = ?, `office_telephone` = ?, `residence_telephone` = ?, `province` = ?, `residential_address` = ? WHERE student_id = " + registration,
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
                            ResidentialAddress
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

app.listen(PORT, () => {

    console.log("server run on localhost:8080");

})