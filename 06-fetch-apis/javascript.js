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


//fetch function using async-await method 
async function fetchData(){
    /*the fetch function will return an object, 'response' object. We will await a promise, returned by fetch() */
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
        return tempC; //trying to access tempC while considering variable scope... 
   }
    /*one parameter, an error, if we recieve an error--lets console that error via error*/
    catch(error){
        console.error(error);
    }
}

document.getElementById('button').addEventListener("click", async () => {
    try {
        const tempC = await fetchData();
        document.getElementById("temp").textContent = `${tempC}`;
    } 
    catch (error) {
        console.error(error);
    }
}); 


//i'll come back to this. 
function extractData() {
    //function to display data fetched from extractData()  

}

/*//Call async-wait function
fetchData();*/



