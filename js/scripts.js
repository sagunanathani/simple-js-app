// create new variable pokemonRepository
let pokemonRepository = (function () {
  // Define an array of Pokémon objects
  let pokemonList = [
    // load data from API
  ];

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  /*   function add(pokemon) {
    pokemonList.push(pokemon);
  } */

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
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
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  //load details of API
  function loadList() {
    showLoadingMessage(); // show before fetch
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage(); // hide after success
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage(); // hide after error
        console.error(e);
      });
  }
  //load all details
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        hideLoadingMessage(); // hide after error
        console.error(e);
      });
  }

  // when click on button see details in console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log("pokemonDetails:", pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();
//console.log(pokemonList);
//console.log('pokemonList:',pokemonRepository.getAll()); // [pokemonList]
pokemonRepository.add({
  name: "Pikachu",
  height: 0.6,
  types: ["bug", "poison"],
});
console.log("pokemonList:", pokemonRepository.getAll()); // [ { name , height & types } ]

//Display Pokémon list with forEach Loops
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

function showLoadingMessage() {
  document.getElementById("loading-message").style.display = "block";
}

function hideLoadingMessage() {
  document.getElementById("loading-message").style.display = "none";
}
