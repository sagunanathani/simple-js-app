// create new variable pokemonRepository
let pokemonRepository = (function () {
  // Define an array of Pokémon objects
  let pokemonList = [
    // load data from API
  ];

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
    let listElement = document.querySelector(".pokemon-list"); // renamed
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary", "btn-block");

    listItem.appendChild(button);
    listElement.appendChild(listItem); // now referring to the correct element

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
        item.imageBackUrl = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
      })
      .catch(function (e) {
        hideLoadingMessage(); // hide after error
        console.error(e);
      });
  }

  let currentPokemon = null; // store current pokemon globally
  // update showdetails with bootstrap
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      currentPokemon = pokemon; // set current pokemon
      // Fill modal content
      $("#pokemonModalLabel").text(pokemon.name);
      $("#pokemon-img").attr("src", pokemon.imageUrl);
      $("#pokemon-img").attr("alt", pokemon.name + " image");

      const types = pokemon.types.map((t) => t.type.name).join(", ");

      const infoHtml = `
        <div class="d-flex justify-content-center gap-3 mb-3">
            <img src="${pokemon.imageUrl}" alt="${pokemon.name} front image" class="pokemon-sprite" />
            <img src="${pokemon.imageBackUrl}" alt="${pokemon.name} back image" class="pokemon-sprite" />
        </div>
        <div>
            Height: ${pokemon.height}<br>
            Weight: ${pokemon.weight}<br>
            Types: ${types}
        </div>
        `;

      $("#pokemon-height").html(infoHtml);

      // Set inert only on background content is handled on modal show/hide events (not here)

      // Show modal - Bootstrap handles focus and accessibility automatically
      $("#pokemonModal").modal("show");
    });
  }
  // Example action for Save Changes button
  document.getElementById("save-button").addEventListener("click", function () {
    if (currentPokemon) {
      alert(`${currentPokemon.name} has been saved to your favorites!`);
      // Optionally store to localStorage or custom list
      $("#pokemonModal").modal("hide");
    }
  });

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

console.log("pokemonList:", pokemonRepository.getAll()); // [ { name , height & types } ]

//Display Pokémon list with forEach Loops
pokemonRepository.loadList().then(function () {
  const modalElement = document.getElementById("pokemonModal");
  const backgroundContent = document.getElementById("backgroundContent");
  const fallbackFocusTarget = document.querySelector("h1");

  $(modalElement).on("show.bs.modal", () => {
    backgroundContent.setAttribute("inert", "");
  });

  $(modalElement).on("hidden.bs.modal", () => {
    backgroundContent.removeAttribute("inert");
    fallbackFocusTarget.focus(); // Fix the blocked aria-hidden warning
  });

  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// 🔍 Enable search functionality
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input[type="search"]');
const pokemonListContainer = document.querySelector('.pokemon-list');

// Function to filter Pokémon
function filterPokemonList() {
  const query = searchInput.value.trim().toLowerCase();
  const pokemonItems = pokemonListContainer.querySelectorAll('li');

  pokemonItems.forEach(item => {
    const name = item.querySelector('button').textContent.toLowerCase();
    item.style.display = !query || name.includes(query) ? 'block' : 'none';
  });
}

// Submit handler
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  filterPokemonList();
});

// Live typing handler
searchInput.addEventListener('input', function () {
  filterPokemonList();
});

function showLoadingMessage() {
  document.getElementById("loading-message").style.display = "block";
}

function hideLoadingMessage() {
  document.getElementById("loading-message").style.display = "none";
}
