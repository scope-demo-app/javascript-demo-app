const API_ENDPOINT = 'https://pokeapi.co/api/v2/'

export async function getPokemons() {
  const response = await fetch(`${API_ENDPOINT}pokemon/`)
  const json = await response.json()
  return json
}

export async function getPokemon(pokemonUrl) {
  const response = await fetch(pokemonUrl)
  const json = await response.json()
  return json
}
