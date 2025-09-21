let person = { // this is a class 
    name: "mike",
    favoritePetIsCat: true,
    hello: function(n) {
        for (let i= 0; i < n ; i ++) {
            console.log("hello");
        }
    },
    favoritePet: {      //This is an object
        name: "buddy", 
        spieces: "cat" 
    }
}

person.hello(100);
console.log(person.favoritePet.name);
person.favoritePet.name = "Mew Mew"
console.log(person.favoritePet.name);

console.log(document) 

function rollDice() {  // Function 
    let randomNumber = Math.ceil(Math.random())*6;
    let diceRollDiv = document.querySelector("#dice-roll");
    diceRollDiv.innerHTML = "<div class = 'dice-roll'>"
}