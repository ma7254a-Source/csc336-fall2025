import fs from 'fs'; 

const data = fs.readFileSync('world.json', 'utf-8');

const towns = JSON.parse(data); 
/*
So we've imported the fs module using es module importation, read the json file, and parsed into a readable object.
Now all I have to do it write a script to read through and print something from the file. I'm thinking I'll just print every item object with the 'rare' rarity value.
*/
