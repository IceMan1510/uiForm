const fs = require("fs")
const validator =require("validator");
exports.registerUser=(req,res)=>{
    const user = req.body;
    if(user.fName==="" || user.lName===""||!validator.isEmail(user.email)){
        res.send("Please send appropriate data")
    }
    else{
        
          let users = readFile();
          users.push(user);
          let json = JSON.stringify(users);
          fs.writeFile("data.json", json, (err) => {
            if (err) {
              console.log(err);
            } else {
              res.send(`User Data Pushed with id ${userWithID.id}`);
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
    res.send(foundUser);}
    else{
        res.send("Please check your email or password")
    }
}

const readFile = () => {
    const jsonData = fs.readFileSync("data.json");
    return JSON.parse(jsonData);
  };
