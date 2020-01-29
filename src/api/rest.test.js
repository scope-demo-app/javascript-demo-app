import { getPokemons, getPokemon } from './rest'

describe('getPokemons', () => {
  it('fetches all the pokemons', async () => {
    const { count, previous, next, results } = await getPokemons()
    expect(count >= 964).toBe(true)
    expect(previous).toBe(null)
    expect(next).not.toBe(null)
    expect(results.length).toBe(20)
    expect(results[0].name).toBe('bulbasaur')
  })
  it('can fetch one single pokemon', async () => {
    const { results } = await getPokemons()
    const [{ url: bulbasaurUrl }] = results
    const bulbasaur = await getPokemon(bulbasaurUrl)
    expect(bulbasaur.base_experience).toBe(64)
  })
})
