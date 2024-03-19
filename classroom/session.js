const express = require("express");
const app = express();
const session = require("express-session")

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));


app.listen(8080, () => {
    console.log("Server started on port 8080");
  });

app.get("/", (req, res)=>{
    console.log("This is root Page :) ");
    if(req.session.count)
    {
        req.session.count++;
    }
    else{
        req.session.count=1
    }
    res.send(`Hellloooooo !!! !! ${req.session.count}`);
});

