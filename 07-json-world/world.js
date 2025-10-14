import fs from 'fs'; 

const data = fs.readFileSync('world.json', 'utf-8');

const worlds = JSON.parse(data); 
/*
So we've imported the fs module using es module importation, read the json file, and parsed into a readable object.
Now all I have to do it write a script to read through and print something from the file. I'm thinking I'll just print every item object with the 'rare' rarity value.
*/

//for loop iterates over each 'layer' in our parsed json world, used class example to map out the loop.
for (const region of worlds.regions) {
    for (const town of region.towns) {
        for (const person of town.notable_people) {
            for (const item of person.items) {
                if (item && typeof item == "object" && item.rarity == "rare") { //I included both objects and strings in my json file so I need to ignore string items since they have no rarity
                    console.log(`Rare Items: ${item.name} (rarity: ${item.rarity}) - Item Owner: ${person.name}, Town: ${town.name}, Region: ${region.name}`);
                }
            }
        }
    }
}
