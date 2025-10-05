//Using weather.gov API -- https://api.weather.gov/ 

//basic fetch method 
fetch("http://api.weatherstack.com/current?access_key=a11733a000cbeecf1937a8b10890bd36&query=New%20York")
.then(res=>res.json()) //"response (<--our response object) --> convert to json"
.then(data => console.log(data)) //"data --> print data"
.catch(err => console.error(err)); //"If theres an error, print it."
//^^ Simple Promise Chain 

