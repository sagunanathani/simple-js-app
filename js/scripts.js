// Define an array of Pokémon objects
let pokemonList = [
    {name: "Bulbasaur", height: 1, types: ['grass', 'poison']},
    {name: "Butterfree", height: 0.5, types: ['bug', 'fighting']},
    {name: "Ekans", height: 3.5, types: ['water', 'fairy']},
    {name: "Psyduck", height: 0.7, types: ['ice', 'ground']}
];
console.log(pokemonList);

//Display Pokémon list with name, height, and conditional message with same loop
for (let i = 0; i < pokemonList.length; i++) {
  let pokemon = pokemonList[i];
  let output = pokemon.name + " (height: " + pokemon.height + ")";

  if (pokemon.height > 3) {
    output += " - Wow, that’s big!";
  }

  console.log(output);
  document.writeln(output + "<br>");
}





