import express from "express";


//create an instance of the express server 
const app = express(); 

app.use(express.static("./public"));

app.get("/api/randomNumber", (req, res) => {
    res.send(Math.random());
});

app.listen(3000);