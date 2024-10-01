const mysql = require("mysql");

//Mysql connection
const con = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port : 3377 
}); 


exports.views = (req,res) => {
    con.getConnection((err,connection)=>{
        if(err) throw err
        connection.query("select * from users",(err,rows) => {
            // after getting records from db we no need connection to release the connection
            connection.release();
            if(!err){
                // console.log("Success");
                res.render("home",{rows});
            }
            else{
                console.log("Error in listing Data" +err)
            }
        })
    })
}

exports.adduser = (req,res)=>{
    res.render("adduser");
}

exports.save = (req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        const {name,age,city}=req.body;
        connection.query("insert into users (name,age,city) values (?,?,?)", [name,age,city],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("adduser",{msg:"User details added successfully"});
            } else{
                console.log("error listing data " + err);
            }
        });
    });
}


exports.edituser = (req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        //Get ID from url
        let id = req.params.id;
        connection.query("select * from users where id=?",[id],(err,rows) => {
            connection.release();
            if(!err){
                res.render("edituser",{rows});
            }else{
                console.log("Error in listing Data" +err)
            }
        });  
    });
}


exports.edit = (req,res) => {
    con.getConnection((err,connection) => {
        if(err) throw err
        const {name,age,city} = req.body;
        let id = req.params.id;
        connection.query("UPDATE users SET name=?, age=?, city=? WHERE id=?",[name,age,city,id],(err,rows) => {
            connection.release();
            if(!err){
                res.render("edituser",{msg : "User details edited successfully"})
            }else{
                console.log("Error in listing Data" +err)
            }
        })
    })
}

exports.deleteuser = (req,res) => {
    con.getConnection((err,connection) => {
        if(err) throw err
        let id = req.params.id;
        connection.query("DELETE from users WHERE id=?",[id],(err,rows) => {
            connection.release();
            if(!err){
                res.render("deleteuser",{msg : "User details deleted successfully"})
            }else{
                console.log("Error in listing Data" +err)
            }
        })
    })
}








