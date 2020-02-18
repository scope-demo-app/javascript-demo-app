export const API_ENDPOINT = 'https://go-demo-app.undefinedlabs.dev'

export async function getRestaurant({ endpoint = API_ENDPOINT, restaurantId } = {}) {
  const response = await fetch(`${endpoint}/restaurants/${restaurantId}`)
  const json = await response.json()
  return json
}

export async function findRestaurant({ endpoint = API_ENDPOINT, name } = {}) {
  const response = await fetch(`${endpoint}/restaurants?${name ? `name=${name}` : ''}`)
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

export async function deleteRestaurant({ endpoint = API_ENDPOINT, restaurantId }) {
  const response = await fetch(`${endpoint}/restaurants/${restaurantId}`, {
    method: 'DELETE',
  })
  return response
}
