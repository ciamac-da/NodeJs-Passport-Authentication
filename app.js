const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs")


//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));


//create a port to run our app on
const PORT = process.env.PORT || 5000;

//write npm run dev in terminal to start 
app.listen(PORT, console.log(`Server started on port ${PORT}`));