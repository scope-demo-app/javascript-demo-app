import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Typography from '@material-ui/core/Typography'

import RestaurantCard from './components/RestaurantCard'
import RestaurantForm from './components/RestaurantForm'
import RateModal from './components/RateModal'

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

const restaurants = [
  {
    id: '1',
    name: 'Restaurant 1',
    photos: [
      'http://media.blogto.com/uploads/2017/02/17/20161206-baro-12.jpg?h=2500&cmd=resize&quality=70&w=1400',
    ],
    rating: 2,
    description: 'description',
    location: {
      lat: '40.416775',
      long: '-3.703790',
    },
  },
  {
    id: '2',
    name: 'Restaurant 2',
    photos: [
      'http://media.blogto.com/uploads/2017/02/17/20161206-baro-12.jpg?h=2500&cmd=resize&quality=70&w=1400',
    ],
    rating: 3.2,
    description: 'description',
    location: {
      lat: '40.416775',
      long: '-3.703790',
    },
  },
  {
    id: '3',
    name: 'Restaurant 3',
    photos: [
      'http://media.blogto.com/uploads/2017/02/17/20161206-baro-12.jpg?h=2500&cmd=resize&quality=70&w=1400',
    ],
    rating: 1.7,
    description: 'description',
    location: {
      lat: '40.416775',
      long: '-3.703790',
    },
  },
  {
    id: '4',
    name: 'Restaurant 4',
    photos: [
      'http://media.blogto.com/uploads/2017/02/17/20161206-baro-12.jpg?h=2500&cmd=resize&quality=70&w=1400',
    ],
    rating: 3,
    description: 'description',
    location: {
      lat: '40.416775',
      long: '-3.703790',
    },
  },
  {
    id: '5',
    name: 'Restaurant 5',
    photos: [
      'http://media.blogto.com/uploads/2017/02/17/20161206-baro-12.jpg?h=2500&cmd=resize&quality=70&w=1400',
    ],
    rating: 3,
    description: 'description',
    location: {
      lat: '40.416775',
      long: '-3.703790',
    },
  },
  {
    id: '6',
    name: 'Restaurant 6',
    photos: [
      'http://media.blogto.com/uploads/2017/02/17/20161206-baro-12.jpg?h=2500&cmd=resize&quality=70&w=1400',
    ],
    rating: 3,
    description: 'description',
    location: {
      lat: '40.416775',
      long: '-3.703790',
    },
  },
]

function App() {
  const classes = useStyles()

  const [ratingRestaurant, setRatingRestaurant] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return
    }
    setSnackbarOpen(false)
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
        onSubmitReview={() => {
          setRatingRestaurant(null)
          setSnackbarOpen(true)
        }}
      />
      <div className={classes.cards}>
        {restaurants.map(restaurant => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onRateRestaurant={() => setRatingRestaurant(restaurant)}
          />
        ))}
      </div>
      <RestaurantForm />
    </div>
  )
}

export default App
