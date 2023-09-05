const pokemonName = document.querySelector(".pokemon__name")
const pokemonNumber = document.querySelector(".pokemon__number")
const pokemonImage = document.querySelector(".pokemon__image")

const form = document.querySelector(".form")
const input = document.querySelector(".input")

const buttonPrev = document.querySelector(".prev")
const buttonNext = document.querySelector(".next")

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (response.status === 200) {
        const data = response.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Loading..."
    pokemonNumber.innerHTML = ""
    pokemonImage.src = ""

    const data = await fetchPokemon(pokemon)

    if (data) {
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
        input.value = ""
        searchPokemon = data.id
    } else {
        pokemonName.innerHTML = "Not found :("
        pokemonNumber.innerHTML = ""
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const pokemon = input.value
    renderPokemon(pokemon.toLowerCase())
})

buttonNext.addEventListener("click", () =>{
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

buttonPrev.addEventListener("click", () =>{
    searchPokemon -= 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)