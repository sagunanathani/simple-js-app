// create new variable pokemonRepository
let pokemonRepository = (function () {
  // Define an array of Pokémon objects
  let pokemonList = [
    // pokemon objects
    { name: "Bulbasaur", height: 1, types: ["grass", "poison"] },
    { name: "Butterfree", height: 0.5, types: ["bug", "fighting"] },
    { name: "Ekans", height: 3.5, types: ["water", "fairy"] },
    { name: "Psyduck", height: 0.7, types: ["ice", "ground"] },
  ];
  return {
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function () {
      return pokemonList;
    },
  };
})();
//console.log(pokemonList);
console.log(pokemonRepository.getAll()); // [pokemonList]
pokemonRepository.add({
  name: "Pikachu",
  height: 0.6,
  types: ["bug", "poison"],
});
console.log(pokemonRepository.getAll()); // [ { name , height & types } ]

//Display Pokémon list with forEach Loops
pokemonRepository.getAll().forEach(function (pokemon) {
  console.log(pokemon.name + " (height: " + pokemon.height + ")");
  document.writeln(
    "<p>" + pokemon.name + " (height: " + pokemon.height + ")</p>"
  );
});
