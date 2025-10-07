//Using WeatherStack, semi-open source weather report API --> free account grants 100 calls/month
//Asked people at work what items they look for most when they view the weather app: chance of rain, temp. highs-lows, and "current" temperature were the largest items.

/* --basic fetch method using a simple promise chain-- 
fetch("http://api.weatherstack.com/current?access_key=a11733a000cbeecf1937a8b10890bd36&query=New%20York")
.then(res=>res.json()) //"response (<--our response object) --> convert to json"
.then(data => console.log(data)) //"data --> print data"
.catch(err => console.error(err)); //"If theres an error, print it."
--Call async-wait function--
fetchData();
*/


/*
//fetch function using async-await method 
async function fetchData(){
    //the fetch function will return an object, 'response' object. We will await a promise, returned by fetch() 
    //try and catch block
    try {
        const response = await fetch("http://api.weatherstack.com/current?access_key=a11733a000cbeecf1937a8b10890bd36&query=New%20York"); 
        //Once this resolves, we will have to see if the response is okay
        if(!response.ok){ //if our reponse object is not ok, then we throw a new error. 
            throw new Error("Could not fetch resource.");
        }
        //if it is okay, we will create a const, data, and convert it to json
        const data = await response.json(); //this line here converts the raw data to JSON
        console.log(data);
        const tempC = data.current.temperature; //Now I can extract whatever single pieces of data I want
        console.log(tempC);
        return tempC; //trying to access tempC while considering variable scope... returns promise, can be accessed. 
   }
    //one parameter, an error, if we recieve an error--lets console that error via error
    catch(error){
        console.error(error);
    }
}
//so we pulled tempC from the API and fetchData() returns it, gettting around variable scope, now await 'fetchData()' promise, and print it from the DOM
document.getElementById('button').addEventListener("click", async () => {
    try {
        const tempC = await fetchData();
        document.getElementById("temp").textContent = `${tempC}`;
    } 
    catch (error) {
        console.error(error);
    }
}); 

//i'll come back to this. actually i wont, did what I wanted to above ^^^
function extractData() {
    //function to display data fetched from extractData()  

}

//Call async-wait function
fetchData();
*/


//Now how do i get multiple single values? --> temp, precipitation, and feels like temp we'll say --> weatherstack doesnt have a high-low range value accessible 
/*create a report object inside our fetchData() that, as we've done before, is printed from the DOM using a second async-await function at the click of our "get weather" button */

async function fetchData() {
    try{
        const response = await fetch("http://api.weatherstack.com/current?access_key=a11733a000cbeecf1937a8b10890bd36&query=Washington%2C%20DC&units=f"); //i know it says New York, ill change to dc before submitting. 
        if(!response.ok) throw new Error ("Could not fetch resource.");
        const data = await response.json();

        //our report object, returned so we can print from the DOM. 
        return {
            city: data.location.name, //wanting to know where the weather is reporting would be nice 
            tempC: data.current.temperature,
            precipitation: data.current.precip,
            feelsLike: data.current.feelslike,
            humidity: data.current.humidity, //throw this in because why not

        };
    }
    catch(error) {
        console.log(error);
    }
}

//now lets print from the DOM --> we'll add a <pre> tag in a new div in our html file to support this report object we've made. 

document.getElementById("button").addEventListener("click", async () =>{
    const output = document.getElementById("report"); //little confusing, ill change the const name when I think of something better to call it --> renaming output because its going to conflict with later constant.
    output.textContent = "Generating..."
    try{
        const report = await fetchData();
        output.textContent = ""; //clear our 'generating' statement
        output.textContent = JSON.stringify(report, null, 2); //for now just going to "pretty-print" the report, we can clean it up either in script or maybe css? 
    }
    catch(error){
    console.log(error);
    }
});

//Just using the same asyn function i've created 
async function fetchJoke() {
    try{
        const response = await fetch ("https://official-joke-api.appspot.com/jokes/random");
        if (!response.ok) throw new Error("That one wasn't that funny.");
        const joke = await response.json();
        return joke;
    }
    catch(error){
        console.log(error);
    }
}

/*fetchJoke() //calling to see if it'll print --> it works.*/

//So now its about connecting it to a button, I'll use some of the code I wrote earlier to just have it return the const then its printed from the DOM via a button press. 
document.getElementById("funny-button").addEventListener("click", async () => {
    const quip = document.getElementById("report"); //having errors prrinting the joke object, i think I can reuse the <pre> tag like i did for my report object to change the fields of the joke object to become readable. 
    quip.textContent = "Getting one from the bit book...";
    try {
        const {setup, punchline} = await fetchJoke(); //destructure joke fields
        quip.textContent = `${setup}\n${punchline}`; //Separated into two pieces, more readable now?
    } 
    catch (error) {
        console.error(error);
    }
}); 

/*Okay so now either will print but in the same space, so only one can exist at the same time. Thats fine right? (nervous laughter) I'm gonna pivot to the CSS rules now. */