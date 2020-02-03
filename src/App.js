import React, { useState } from 'react'
import './App.css'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import RestaurantCard from './components/RestaurantCard'
import RestaurantForm from './components/RestaurantForm'
import RateModal from './components/RateModal'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: 20,
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
  },
  {
    id: '2',
    name: 'Restaurant 2',
    photos: [
      'http://media.blogto.com/uploads/2017/02/17/20161206-baro-12.jpg?h=2500&cmd=resize&quality=70&w=1400',
    ],
    rating: 3.2,
    description: 'description',
  },
  {
    id: '3',
    name: 'Restaurant 3',
    photos: [
      'http://media.blogto.com/uploads/2017/02/17/20161206-baro-12.jpg?h=2500&cmd=resize&quality=70&w=1400',
    ],
    rating: 1.7,
    description: 'description',
  },
  {
    id: '4',
    name: 'Restaurant 4',
    photos: [
      'http://media.blogto.com/uploads/2017/02/17/20161206-baro-12.jpg?h=2500&cmd=resize&quality=70&w=1400',
    ],
    rating: 3,
    description: 'description',
  },
  {
    id: '5',
    name: 'Restaurant 5',
    photos: [
      'http://media.blogto.com/uploads/2017/02/17/20161206-baro-12.jpg?h=2500&cmd=resize&quality=70&w=1400',
    ],
    rating: 3,
    description: 'description',
  },
  {
    id: '6',
    name: 'Restaurant 6',
    photos: [
      'http://media.blogto.com/uploads/2017/02/17/20161206-baro-12.jpg?h=2500&cmd=resize&quality=70&w=1400',
    ],
    rating: 3,
    description: 'description',
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
      {restaurants.map(restaurant => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onRateRestaurant={() => setRatingRestaurant(restaurant)}
        />
      ))}
      <RestaurantForm />
    </div>
  )
}

export default App
