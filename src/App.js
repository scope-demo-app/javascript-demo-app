import React, { useState } from 'react'
import './App.css'
import { makeStyles } from '@material-ui/core/styles'

import RestaurantCard from './components/RestaurantCard'
import RestaurantForm from './components/RestaurantForm'
import RateModal from './components/RateModal'

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

  return (
    <div className={classes.root}>
      <RateModal restaurant={ratingRestaurant} onClose={() => setRatingRestaurant(null)} />
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
