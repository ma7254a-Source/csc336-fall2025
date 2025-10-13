import fs from 'fs'; 

const data = fs.readFileSync('world.json', 'utf-8');

const towns = JSON.parse(data);
console.log(towns);