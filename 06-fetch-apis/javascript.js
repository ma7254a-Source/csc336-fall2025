//Using WeatherStack, semi-open source weather report API --> free account grants 100 calls/month

/*
//basic fetch method 
fetch("http://api.weatherstack.com/current?access_key=a11733a000cbeecf1937a8b10890bd36&query=New%20York")
.then(res=>res.json()) //"response (<--our response object) --> convert to json"
.then(data => console.log(data)) //"data --> print data"
.catch(err => console.error(err)); //"If theres an error, print it."
//^^ Simple Promise Chain 
*/

//fetch using async-wait function
async function fetchData(){
    //try and catch block
    /*the fetch function will return an object, 'response' object. We will await a promise, returned by fetch() */
    try {
        const response = await fetch("http://api.weatherstack.com/current?access_key=a11733a000cbeecf1937a8b10890bd36&query=New%20York"); 
        //Once this resolves, we will have to see if the response is okay
        if(!response.ok){ //if our reponse object is not ok, then we throw a new error. 
            throw new Error("Could not fetch resource.");
        }
        //if it is okay, we will create a const, data, and convert it to json
        const data = await response.json();
        const tempC = data.current.temperature;
        console.log(data);
        console.log(tempC);
    }
    /*one parameter, an error, if we recieve an error--lets console that error via error*/
    catch(error){
        console.error(error);
    }
}



function extractData() {
    //function to display data fetched from extractData()  

}

/*//Call async-wait function
fetchData();*/



