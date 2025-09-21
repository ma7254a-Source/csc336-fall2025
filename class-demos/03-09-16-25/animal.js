let animals = [
    {
        type: "cat",
        strength: 10,
        charisma:16
    },
    {
        type: "dog",
        strength: 14,
        charisma:9
    },
    {
        type: "rabbit",
        strength: 7,
        charisma:12
    },
    {
        type: "seahorse",
        strength: 2,
        charisma:20
    }
]

document.addEventListener("DOMContentLoaded", populationAnimalDiv)

function populationAnimalDiv() {
    let animaldiv = document.querySelector("#all-animal-info");
    //for (let i = 0; i < animals.length; i++) {
        // let animal = animals[i];
        // }
        for (let animal of animals) {
            let animalDiv = createAnimalDiv(animal) {
                console.log(animal)
            }
        }
    }
}