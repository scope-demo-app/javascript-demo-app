import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import RestaurantCard from './components/RestaurantCard'
import RestaurantForm from './components/RestaurantForm'
import RateModal from './components/RateModal'
import {
  API_ENDPOINT,
  rateRestaurant,
  findRestaurant,
  getRestaurant,
  deleteRestaurant,
} from './api'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  cards: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.paper,
  },
  searchBar: {
    marginBottom: 20,
  },
}))

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  let handler = useRef(null)

  useEffect(() => {
    handler.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler.current)
    }
  }, [value, delay])

  const forceValue = forcedValue => {
    if (handler.current) {
      clearTimeout(handler.current)
    }
    setDebouncedValue(forcedValue)
  }

  return [debouncedValue, forceValue]
}

const DEBOUNCE_TIME = 300

function App() {
  const classes = useStyles()
  const [ratingRestaurant, setRatingRestaurant] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [restaurants, setRestaurants] = useState({})
  const [error, setError] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounce(searchTerm, DEBOUNCE_TIME)

  const url = new URL(window.location.href)

  const failureRate = url.searchParams.get('failureRate')

  const wrongUrl = url.searchParams.get('wrongUrl')

  useEffect(() => {
    const getRestaurantFunc = async () => {
      if (wrongUrl) {
        await getRestaurant({ restaurantId: '01b5e8d5-76ee-41a5-aca4-2990b2843bda' })
        setError(true)
      }
    }
    getRestaurantFunc()
  }, [wrongUrl])

  useEffect(() => {
    const getRestaurantsByName = async () => {
      const foundRestaurants =
        (await findRestaurant({ name: debouncedSearchTerm, failureRate })) || []
      let restaurantByKey = {}
      for (let restaurant of foundRestaurants) {
        restaurantByKey[restaurant.id] = restaurant
      }
      setRestaurants(restaurantByKey)
    }
    getRestaurantsByName()
  }, [debouncedSearchTerm, failureRate])

  if (error) return null

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  function onSubmitRestaurant(newRestaurant) {
    if (!restaurants[newRestaurant.id]) {
      setRestaurants(previousRestaurants => ({
        ...previousRestaurants,
        [newRestaurant.id]: newRestaurant,
      }))
    }
  }

  async function onDeleteRestaurant(restaurantId) {
    const response = await deleteRestaurant({ restaurantId })
    if (response.status === 200) {
      setRestaurants(previousRestaurants => {
        const { [restaurantId]: removedRestaurant, ...rest } = previousRestaurants
        return rest
      })
    }
  }

  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h3" component="h3">
        Hamburguesía
      </Typography>
      <TextField
        id="search"
        label="Search restaurant"
        type="search"
        className={classes.searchBar}
        value={searchTerm}
        onChange={({ target: { value } }) => setSearchTerm(value)}
      />
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Thanks for your feedback!
        </Alert>
      </Snackbar>
      <RateModal
        restaurant={ratingRestaurant}
        onClose={() => setRatingRestaurant(null)}
        onSubmitReview={async rating => {
          const newRating = await rateRestaurant({ restaurantId: ratingRestaurant.id, rating })
          setRestaurants(previousRestaurants => {
            const newRestaurants = {
              ...previousRestaurants,
              [ratingRestaurant.id]: {
                ...ratingRestaurant,
                rating: newRating,
              },
            }
            return newRestaurants
          })
          setRatingRestaurant(null)
          setSnackbarOpen(true)
        }}
      />
      <div className={classes.cards}>
        {Object.values(restaurants).map(restaurant => (
          <RestaurantCard
            onDelete={() => onDeleteRestaurant(restaurant.id)}
            key={restaurant.id}
            restaurant={{
              ...restaurant,
              images: restaurant.images
                ? restaurant.images.map(image => `${API_ENDPOINT}${image}`)
                : [],
            }}
            onRateRestaurant={() => setRatingRestaurant(restaurant)}
          />
        ))}
      </div>
      <RestaurantForm onSubmitRestaurant={onSubmitRestaurant} />
    </div>
  )
}

export default App
