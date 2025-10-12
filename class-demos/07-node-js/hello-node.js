const fs = require("fs"); // import library using "CommonJS"

console.log("hello!"); 

let randomNumbers = [];

//read "randomNumbers.txt"
let fileContents = fs.readFileSync("./randomNumbers.txt", "utf8");
console.log(fileContents[0]); //will return '['

randomNumbers = JSON.parse(fileContents);

for (i = 0; i <5; i++) {
    let rand = Math.random();
    randomNumbers[i] = rand;
    //console.log(randomNumbers[i]);
}

//let str = "";
//for ( let rand of randomNumbers) {
//    str += rand + "\n"; 
//}

fs.writeFileSync("randomNumbers.txt", JSON.stringify(randomNumbers));