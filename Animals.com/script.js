function animalLevel(level){
    switch(level.toLowerCase()){
        case "vulnerable": return "Assets/Icons/Danger_Vulnerable.png"
        case "critically endangered": return "Assets/Icons/Danger_Critical.png"
        case "endangered": return "Assets/Icons/Danger_Endangered.png"
    }
};
function animalHabitat(habitat){
    switch(habitat.toLowerCase()){
        case "desert": return "Assets/Icons/Habitat_Desert.png"
        case "forest": return "Assets/Icons/Habitat_Forest.png"
        case "grassland": return "Assets/Icons/Habitat_Grassland.png"
        case "wetland": return "Assets/Icons/Habitat_Grassland.png"
        case "island": return "Assets/Icons/Habitat_Marine.png"
        case "river": return "Assets/Icons/Habitat_Marine.png"
        case "marine": return "Assets/Icons/Habitat_Marine.png"
        case "mountain": return "Assets/Icons/Habitat_Mountain.png"
    }
};
function animalType(type){
    switch(type.toLowerCase()){
        case "reptile": return "Assets/Icons/Species_Reptile.png"
        case "mammal": return "Assets/Icons/Species_Mammal.png"
        case "insect": return "Assets/Icons/Species_Insect.png"
        case "fish": return "Assets/Icons/Species_Fish.png"
        case "bird": return "Assets/Icons/Species_Bird.png"
        case "amphibian": return "Assets/Icons/Species_Amphibian.png"
    }
};
let animals = [];
let loadAnimal = 6
let currentAnimal = 0
const animal_container = document.getElementById("animal_container");
const animal_featured = document.getElementById("featured")

fetch("animals.json")
    .then(response => response.json())
    .then(data => {
        animals = data;
        renderAnimals();
        renderAnimalFeatured();
    });

function renderAnimals(){
    const end = currentAnimal + loadAnimal;

    animals.slice(currentAnimal, end).forEach(animal => {
        appendAnimal(animal, animal_container, "slideUp")
    });

    currentAnimal = end;
    if (currentAnimal >= animals.length){
        document.getElementById("moreBtn").style.display = "none";
    }
};

function renderAnimalFeatured(){
    const animal = animals[Math.floor(Math.random() * animals.length)];
    appendAnimal(animal, animal_featured, "popIn", "featured")
}

function appendAnimal(animal, container, animation, special){
    let levelIcon = animalLevel(animal.level);
        let habitatIcon = animalHabitat(animal.habitat);
        let typeIcon = animalType(animal.type);
    
        const card = document.createElement("article");
        card.className = `animal_card ${animation} ${special}`;
        card.innerHTML =
        `
        <img src="${animal.image}" class="animal_img">
        <h1>${animal.name}</h1>
        <p>${animal.description}</p>
        <div class="animal_info">
            <img src="${levelIcon}" class="animal_level">
            <img src="${typeIcon}" class="animal_species">
            <img src="${habitatIcon}" class="animal_habitat">
        </div>
        `;   
        container.append(card);
}
document.getElementById("moreBtn").addEventListener("click", renderAnimals);

