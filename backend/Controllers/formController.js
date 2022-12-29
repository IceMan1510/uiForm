const e = require("express");
const fs = require("fs")
const validator =require("validator");

exports.registerUser=(req,res)=>{
    const user = req.body;
    const users=readFile();
    if(user.fName==="" || user.lName===""||!validator.isEmail(user.email)){
        res.send("Please send appropriate data")
    }
    
    else if(!emailCheck(user.email,users)){

      res.send("False")
    }
    else{
          let users = readFile();
          users.push(user);
          let json = JSON.stringify(users);
          fs.writeFile("data.json", json, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("User reg")
              res.send(`User Data Pushed with id ${user.email}`);
            }
          });
    }
}


exports.getSingleUser=(req, res) => {
    const users = readFile();
    const { id } = req.params;
    const foundUser = users.find((user) => user.email === id);
    res.send(foundUser);
  };
exports.getAllUsers=(req, res) => {
    res.send(readFile());
  };
exports.loginUser=(req,res)=>{
    const users = readFile();
    const id = req.body.id; 
    const pwd=req.body.pwd;
    const foundUser = users.find((user) => user.email === id)
    if(foundUser.password===pwd){
    res.send(true)
    }
    else{
        res.send("false")
    }
}

const readFile = () => {
    const jsonData = fs.readFileSync("data.json");
    return JSON.parse(jsonData);
  };

const emailCheck=(email,users)=>{
  for (var i = 0; i < users.length; i++){
    // look for the entry with a matching `code` value
    if (users[i].email == email){
       // we found it
       return true
      // obj[i].name is the matched result
    }
    else{
      return false
    }
  }
}