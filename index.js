const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app=express();
const path = require("path");
const methodOverride=require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));


const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'myapp',
    password : 'Shree@3265'
});

let getRandomUser = () => {
  return [
     faker.string.uuid(),
     faker.internet.username(), // before version 9.1.0, use userName()
     faker.internet.email(),
     faker.internet.password(),
  ];
}

// let q = "INSERT INTO user (id, username, email, password) VALUES ?";
// let users = [ 
//                 ["123b","123_newUserb","abc@gmail.comb","abcb"] , 
//                 ["123c","123_newUserc","abc@gmail.comc","abcc"] ,
//                 ["123d","123_newUserd","abc@gmail.comd","abcd"]
//             ];



// connection.end();

app.get("/",(req,res)=>{
    let q = `SELECT count(*) FROM user`;
    try{
    connection.query(q, (err,result)=>{
        if(err) throw err;
        let count=result[0]['count(*)'];
        console.log(count);
        // res.send(result[0]['count(*)']);
        res.render("home.ejs",{count});
    });
    }
    catch(err){
        console.log(err); 
        res.send("Something error in DB");   
    }
    
});

app.get("/user",(req,res)=>{
    let q=`SELECT * FROM user`;
    try{
        connection.query(q, (err,users)=>{
            if(err) throw err;

            // console.log(result);
            res.render("showusers",{ users });
        });
    }
    catch(err){
        console.log("Error",err);
        
    }    
});

app.get("/users/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q=`SELECT * FROM user WHERE id='${id}'`;

    try{
        connection.query(q, (err,result)=>{
            if(err) throw err;
            let user = result[0];
            // console.log(result[0]);
            res.render("edit",{user});
        });
    }
    catch(err){
        console.log("Error",err);
        
    }  
});

app.patch("/user/:id",(req,res)=>{
    let {id}=req.params;
    let {password : formPass, username : newUsername}=req.body;
    let q=`SELECT * FROM user WHERE id='${id}'`;

    try{
        connection.query(q, (err,result)=>{
            if(err) throw err;
            let user = result[0];
            // console.log("Form pass :",formPass);
            // console.log("User pass :",user.password);

            if(formPass!=user.password)
            {
                res.send("Wrong password.! Try again.")
            }
            else{
                let q2=`UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
                try{
                    connection.query(q2,(err,result)=>{
                        if(err) throw err;
                        console.log(newUsername,id,id);
                        res.redirect("/user");
                        
                    });
                }
                catch(err){
                    console.log(err);
                    res.send("some error in DB");
                    
                }

            }

        });
    }
    catch(err){
        console.log("Error",err);
        res.send("some error in DB");
    } 
});

app.get("/users/new", (req, res) => {
  res.render("newuser");  // create views/newuser.ejs
});

app.post("/users", (req, res) => {
  let { id, username, email, password } = req.body;
  let q = `INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)`;

  connection.query(q, [id, username, email, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error adding user");
    }
    res.redirect("/user");
  });
});

app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const { password: formPass } = req.body;

  let q = `SELECT * FROM user WHERE id = ?`;
  connection.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error accessing user data");
    }

    const user = result[0];

    if (!user || user.password !== formPass) {
      return res.send("❌ Wrong password! Deletion denied.");
    }

    // Password matched, now delete
    let deleteQ = `DELETE FROM user WHERE id = ?`;
    connection.query(deleteQ, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Error deleting user");
      }
      res.redirect("/user");
    });
  });
});



app.listen(8080,()=>{
    console.log("App listening on port 8080");
});