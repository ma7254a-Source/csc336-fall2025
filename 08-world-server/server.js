//get an express server running
import express from "express"; 
import fs from "fs"; 

const app = express(); 

app.use(express.static("./public")); //serves static files 
app.use(express.json()); 

//GET /world route. 
app.get("/world", async (req, res) => {
        //const data = await fs.readFileSync("world.json", "utf-8");
        //const object = JSON.parse(data);
        //res.json(object);
        const data = JSON.parse(fs.readFileSync("./world.json", "utf-8"));
        res.json(data); 
}); 

//POST /update route. 
app.post("/update", async (req, res) => {
    /*modifies data based on client request
    expects the request: 
    {
        region: "Westerlands", 
        town: "Genoa", 
        person: {name: larry, role: "UPS Driver", items: ["pocket lint"] }
    }                   
*/
    const world = JSON.parse(fs.readFileSync("./world.json", "utf-8")); //reads world.json
    const {region, town, person} = req.body;

    /*
    original loop used 'for (let r in world.regions)' then 'r.name',
    but 'r' was an index string, not a region object. Switched to find()
    with case insensitive matching. 

    for (let r in world.regions) {
        if (r.name == region) {
            for (let t of r.towns) {
                if (t.name == town) {
                    t.notable_people.push({
                        name: person.name,
                        role: person.role, 
                        items: Array.isArray(person.items) ? person.items:[]
                    });
                }
            }
        }
    }
    */

    const regionObj = (world.regions || []).find(
        (r) => r.name && r.name.toLowerCase() === region.toLowerCase()
    );
    if (!regionObj) {
        return res.status(404).json({error: `Region "${region}" not found`});
    }

    const townObj = (regionObj.towns || []).find(
        (t) => t.name && t.name.toLowerCase() === town.toLowerCase()
    );
    if (!townObj) {
        return res.status(404).json({ error: `Town "${town}" not found in region "${regionObj.name}"` });
    }

    //ensures array exists and normalize items in an array
    townObj.notable_people = Array.isArray(townObj.notable_people) ? townObj.notable_people: [];
    townObj.notable_people.push({
        name: person.name,
        role: person.role || "",
        items: Array.isArray(person.items) ? person.items : [],
    }); 
    

    //Write it back to file
    fs.writeFileSync("world.json", JSON.stringify(world, null, 2));

    //Modified data is written back to the disk and send as a response to client
    res.json(world);
});

app.listen(3000);



