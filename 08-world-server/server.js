//get an express server running
import express from "express"; 
//import fs from fs; 

const app = express(); 

app.use(express.static("./public"));
app.listen(3000);