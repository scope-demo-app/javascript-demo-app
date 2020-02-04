import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'

import RestaurantCard from './components/RestaurantCard'
import RestaurantForm from './components/RestaurantForm'
import RateModal from './components/RateModal'
import { getRestaurants, LOCAL_ENDPOINT, rateRestaurant } from './api'

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
}))

function App() {
  const classes = useStyles()
  const [ratingRestaurant, setRatingRestaurant] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    const fetchRestaurants = async () => {
      const fetchedRestaurants = await getRestaurants()
      setRestaurants(fetchedRestaurants)
    }
    fetchRestaurants()
  }, [])

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
  }

  function onSubmitRestaurant(newRestaurant) {
    if (!restaurants.find(restaurant => restaurant.id === newRestaurant.id)) {
      setRestaurants(previousRestaurants => [newRestaurant, ...previousRestaurants])
    }
  }

  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h3" component="h3">
        Hamburguesía
      </Typography>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Thanks for your feedback!
        </Alert>
      </Snackbar>
      <RateModal
        restaurant={ratingRestaurant}
        onClose={() => setRatingRestaurant(null)}
        onSubmitReview={rating => {
          rateRestaurant({ restaurantId: ratingRestaurant.id, rating })
          setRatingRestaurant(null)
          setSnackbarOpen(true)
        }}
      />
      <div className={classes.cards}>
        {restaurants
          .map(restaurant => ({
            ...restaurant,
            images: restaurant.images
              ? restaurant.images.map(image => `${LOCAL_ENDPOINT}${image}`)
              : [],
          }))
          .map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onRateRestaurant={() => setRatingRestaurant(restaurant)}
            />
          ))}
      </div>
      <RestaurantForm onSubmitRestaurant={onSubmitRestaurant} />
    </div>
  )
}

export default App
