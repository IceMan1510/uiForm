const e = require("express");
const fs = require("fs");
const validator = require("validator");

exports.registerUser = (req, res) => {
  const user = req.body;
  if (
    user.fName.trim() === "" ||
    !isAlpha(user.lName) ||
    user.lName.trim() === "" ||
    !validator.isEmail(user.email) ||
    !isAlpha(user.fName)
  ) {
    res.status(400).send("Please send appropriate data");
  } else if (isEmailExists(user.email)) {
    res.status(400).send("Email already exists");
  } else {
    let users = readFile();
    users.push(user);
    let json = JSON.stringify(users);
    fs.writeFile("data.json", json, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("User reg");
        res.send(`${user.fName}'s Data Pushed with id ${user.email}`);
      }
    });
  }
};

exports.getSingleUser = (req, res) => {
  const users = readFile();
  const { id } = req.params;
  const foundUser = users.find((user) => user.email === id);
  res.send(foundUser);
};
exports.getAllUsers = (req, res) => {
  res.send(readFile());
};
exports.loginUser = (req, res) => {
  const users = readFile();
  const id = req.body.id;
  const pwd = req.body.pwd;
  const foundUser = users.find((user) => user.email === id);
  console.log(foundUser);
  if (foundUser === undefined) {
    res.status(400).send("Check your email & password");
  } else if (foundUser.password === pwd) {
    res.status(200).send("Login Successful");
  } else {
    res.status(400).send("Check your email & password");
  }
};

const readFile = () => {
  const jsonData = fs.readFileSync("data.json");
  return JSON.parse(jsonData);
};

const isEmailExists = (email) => {
  const users = readFile();
  const foundUser = users.find((user) => user.email === email);
  if (foundUser === "") {
    return false;
  } else {
    return true;
  }
};
