export const API_ENDPOINT = 'https://go-demo-app.undefinedlabs.dev'

export async function getRestaurant({ endpoint = API_ENDPOINT, restaurantId } = {}) {
  const response = await fetch(`${endpoint}/restaurants/${restaurantId}`)
  return response
}

export async function findRestaurant({ endpoint = API_ENDPOINT, name, failureRate = 0 } = {}) {
  const response = await fetch(
    `${endpoint}/restaurants?rs.failure=${failureRate}${name ? `&name=${name}` : ''}`
  )
  const json = await response.json()
  return json
}

export async function submitRestaurant({ endpoint = API_ENDPOINT, restaurant } = {}) {
  const response = await fetch(`${endpoint}/restaurants`, {
    method: 'POST',
    body: JSON.stringify(restaurant),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const json = await response.json()
  return json
}

export async function rateRestaurant({ endpoint = API_ENDPOINT, restaurantId, rating }) {
  const response = await fetch(`${endpoint}/rating/${restaurantId}`, {
    method: 'POST',
    body: rating,
  })
  const newRating = await response.text()
  return newRating
}
