/*fetch /world on load and display some world information dynamically, below is the example code. 
    async function loadWorld() {
        const res = await fetch("/world");
        const data =  await res.json();

        document.getElementById("worldDiv").innerHTML = 
        `<ul><li>${data.regions[0].towns[1].notable_people[0].name}</li></ul>`; 
    }

    loadWorld(); 
*/ 

//new loadWorld uses for loop to traverse regions -> towns -> notable_people and prints the data stored in world.json
async function loadWorld() {
    const res = await fetch("/world");
    const world = await res.json(); 

    const rows = [];
    for (const region of world.regions) {
        for (const town of region.towns) {
            for (const person of town.notable_people) {
                /*Changed to <li> because each row was pushed as a standalone <ul> and then everything
                was wrapped in another <ul>, which was incorrect nesting. I switched each row
                to an <li> and kept a single outer <ul>.*/ 
                rows.push(
                    `<li>
                    <strong>Town:</strong> ${town.name} <br>
                    <strong>Person:</strong> ${person.name} <br>
                    <strong>Role:</strong> ${person.role}
                    </li>`
                ); 
            }
        }
    }
    
    document.getElementById("worldDiv").innerHTML = `<ul>${rows.join("")}</ul>`; 
}  

loadWorld();  

const addPersonForm = document.querySelector('#addPersonForm');

addPersonForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fd = new FormData(addPersonForm);
    const form = Object.fromEntries(fd.entries()); 

    //the body form we expect by /update route
    const payload = {
        region: form.region,
        town: form.town, 
        person: {
            name: form.name,
            role: form.role,
            items: form.item ? [form.item] : []
        }
    };

    //send to server (same as example) 
    const res = await fetch("/update", {
        method: "POST",
        headers: {"Content-Type": "application/json" }, 
        body: JSON.stringify(payload)
    }); 

    //rerender world after submission
    await res.json();
    addPersonForm.reset();
    loadWorld();
});