export async function getRestaurants(endpoint) {
  const response = await fetch(`${endpoint}/restaurants`)
  const json = await response.json()
  return json
}

export async function getRestaurant(endpoint, restaurantId) {
  const response = await fetch(`${endpoint}/restaurants/${restaurantId}`)
  const json = await response.json()
  return json
}

export async function findRestaurant(endpoint, name) {
  const response = await fetch(`${endpoint}/restaurants?name=${name}`)
  const json = await response.json()
  return json
}

export async function submitRestaurant(endpoint, restaurant) {
  const response = await fetch(`${endpoint}/restaurants/`, {
    method: 'POST',
    body: JSON.stringify(restaurant),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const json = await response.json()
  return json
}
