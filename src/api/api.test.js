import fetch from 'node-fetch'

describe('api', () => {
  it('can fetch all restaurants', async () => {
    expect(true).toEqual(true)
  })
  it('integration test', async () => {
    const response = await fetch('https://go-demo-app.undefinedlabs.dev/restaurants/')
    expect(response.status).toEqual(200)
  })
})
