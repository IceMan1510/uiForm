const express = require("express");
const userRoute =require("./Routes/userRoutes.js")
const app = express();
var cors = require('cors')
app.use(cors())
const bodyParser= require("body-parser");
const PORT=4000;
app.use(bodyParser.json());
app.use(express.urlencoded());

const user = require("./Routes/userRoutes");
app.use("/user", userRoute);
app.get("/", (req, res) => {
  res.send("<h1>Hello from the home</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`);
});
