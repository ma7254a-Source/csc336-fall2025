class Person {
    constructor(n) {
        this.name = n; //Javascript classes are "malleable"

    }
    sayHello(howManyTimes) { //this is a method
        for (let i = 0; i < howManyTimes; i++) {
            console.log("Hello, my name is " + this.name);  
        }
        //console.log("Hello, my name is " + this.name); 
    }
}


let mike = new Person("Mike"); 

mike.sayHello(22)

console.log(localStorage.getItem('user'));
localStorage.setItem("user", "mike" + Math.random()); //key then value 
let stringVersionOfMike = JSON.stringify(mike);
console.log(stringVersionOfMike); 

function buttonClick() {
    console.log("Button clicked.");
    console.log(this);

}

let myButton = document.querySelector('#myButton');
myButton.addEventListener("click", buttonClick);

//This is an arrow function.
//myButton.addEventListener("click", (e) => {
//    console.log("Button clicked.");
//  console.log(e) 
//}); 

const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

//Draw a filled rectangle. 
ctx.fillstyle = 'skyblue';
ctx.fillRect(50, 50, 100, 75);
