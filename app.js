const express = require('express');
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


//Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

//static files
app.use(express.static("public"));

//Template Engines
const handlebars = exhbs.create({extname:".hbs"});
app.engine("hbs",handlebars.engine);
app.set("view engine","hbs");

//Mysql connection
// const con = mysql.createPool({
//     host : process.env.DB_HOST,
//     user : process.env.DB_USER,
//     password : process.env.DB_PASS,
//     database : process.env.DB_NAME,
//     port : 3377 
// }); 

//Check database Connection
// con.getConnection((err,connection)=>{
//     if(err) throw err
//     console.log("Connection Success");
// })

//Router
// app.get('/',(req,res) => {
//     res.render("home");
// })


const routes = require("./server/routes/student");
app.use('/',routes);


//Listen port
app.listen(port,()=>{
    console.log("Listening Port : " +port);
})

