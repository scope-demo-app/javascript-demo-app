export const LOCAL_ENDPOINT = 'http://192.168.1.28:8081'

export async function getRestaurants({ endpoint = LOCAL_ENDPOINT } = {}) {
  const response = await fetch(`${endpoint}/restaurants`)
  const json = await response.json()
  return json
}

export async function getRestaurant({ endpoint = LOCAL_ENDPOINT, restaurantId } = {}) {
  const response = await fetch(`${endpoint}/restaurants/${restaurantId}`)
  const json = await response.json()
  return json
}

export async function findRestaurant({ endpoint = LOCAL_ENDPOINT, name } = {}) {
  const response = await fetch(`${endpoint}/restaurants${name ? `?name=${name}` : ''}`)
  const json = await response.json()
  return json
}

export async function submitRestaurant({ endpoint = LOCAL_ENDPOINT, restaurant } = {}) {
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

export async function rateRestaurant({ endpoint = LOCAL_ENDPOINT, restaurantId, rating }) {
  const response = await fetch(`${endpoint}/rating/${restaurantId}`, {
    method: 'POST',
    body: rating,
  })
  const newRating = await response.text()
  return newRating
}
