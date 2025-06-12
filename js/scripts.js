// Define an array of Pokémon objects
let pokemonList = [
    {name: "Bulbasaur", height: 1, types: ['grass', 'poison']},
    {name: "Butterfree", height: 0.5, types: ['bug', 'fighting']},
    {name: "Ekans", height: 3.5, types: ['water', 'fairy']},
    {name: "Psyduck", height: 0.7, types: ['ice', 'ground']}
];
console.log(pokemonList);

// Loop through each Pokémon and write its name and height
for (let i = 0; i < pokemonList.length; i++) {
  console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ")");
  document.writeln(pokemonList[i].name + " (height: " + pokemonList[i].height + ") <br>");
} 

// Highlight if height is greater than 3
for (let i = 0; i < pokemonList.length; i++) {
    if(pokemonList[i].height > 3){
        console.log(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that’s big!");
    }
} 




