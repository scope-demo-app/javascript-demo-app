import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'

import { getRestaurant } from '../api'

function RestaurantModal({ restaurantId, onClose }) {
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getRestaurantInfo = async () => {
      const fetchedRestaurant = await getRestaurant({ restaurantId })
      setRestaurant(fetchedRestaurant)
      setLoading(false)
    }
    if (restaurantId) {
      getRestaurantInfo()
    }
  }, [restaurantId])

  const open = !!restaurantId

  return (
    <Dialog onClose={onClose} open={open} aria-labelledby="simple-dialog-title">
      {loading && <CircularProgress />}
      {restaurant && <DialogTitle>{restaurant.name}</DialogTitle>}
      {restaurant && <DialogContent>{restaurant.description}</DialogContent>}
    </Dialog>
  )
}

export default RestaurantModal
