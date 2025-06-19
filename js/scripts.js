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
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li"); // create <li>
    let button = document.createElement("button"); // create button element

    button.innerText = pokemon.name; // Set button text
    button.classList.add("pokemon-button"); // Add custom class
    
    listItem.appendChild(button); // Add button to <li>
    pokemonList.appendChild(listItem); // Add <li> to <ul>
     //  When button is clicked, show details
    button.addEventListener('click', function () {
    showDetails(pokemon);
  });
  }
  function showDetails(pokemon) {
    console.log(pokemon);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
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
    pokemonRepository.addListItem(pokemon);
});
