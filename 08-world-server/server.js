//get an express server running
import express from "express"; 
import fs from "fs"; 

const app = express(); 

app.use(express.static("./public")); //serves static files 
app.use(express.json()); 

//GET/world route 
app.get("/world", async (req, res) => {
        const data = await fs.readFileSync("world.json", "utf-8");
        const object = JSON.parse(data);
        res.json(object); 
}); 

//POST /update route 
app.post("/update", async (req, res) => {
    const world = JSON.parse(fs.readFileSync("./world.json", "utf-8")); //reads world.json

    /*
    modifies data based on client request
    expects the request: 
    { region: "Westerlands", town: "Genoa", person: {name: larry, item: pocket lint, role: UPS driver}}
   */
    const {region, town, person} = req.body;

    for (let r in world.regions) {
        if (r.name == region) {
            for (let t of r.towns) {
                if (t.name == town) {
                    t.notable_people.push({
                        name: person?.name || "unnamed",
                        role: person?.role || "commoner", 
                        items: Array.isarray(person?.items) ? person.items:[]
                    });
                }
            }
        }
    }

    //Write it back to file
    await fs.writeFileSync("world.json", JSON.stringify(world, null, 2));

    //Modified data is written back to the disk and send as a response to client
    res.json(world);
})









app.listen(3000);



