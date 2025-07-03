const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");

const sessionOptions = {
    secret: "mysupersecretstring",
    resave : false,
    saveUninitialized: true,
};
app.use(session(sessionOptions));

// app.get("/getcookies",(req,res) =>{
//     res.cookie("great","namaste");
//     res.cookie("madeIn","India");
//     res.send("send you some cookies!");
// });


// app.get("/",(req,res) =>{
//     console.dir(req,cookies);
//     res.send("Hi! Iam root!");
// });
// app.use("/users",users);
// app.use("/posts".posts);
app.listen(3000,() =>{
    console.log("server id listening to 3000");
});