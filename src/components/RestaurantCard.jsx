import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import StarRateIcon from '@material-ui/icons/StarRate'
import StarHalfIcon from '@material-ui/icons/StarHalf'

const useStyles = makeStyles({
  root: {
    width: 345,
    marginBottom: 20,
    marginRight: 20,
  },
  media: {
    height: 140,
  },
})

function Rating({ rating }) {
  const rounded = Math.floor(rating)
  const showHalf = rating - rounded > 0.5
  return (
    <>
      {Array.from({ length: rounded }).map((el, i) => (
        <StarRateIcon key={i} />
      ))}
      {showHalf && <StarHalfIcon style={{ width: '20px' }} />}
    </>
  )
}

function RestaurantCard({ restaurant, onRateRestaurant }) {
  const classes = useStyles()
  const { name, photos, rating, description } = restaurant

  const [mainPhoto] = photos
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={mainPhoto} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Rating rating={rating} />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onRateRestaurant}>
          Rate
        </Button>
        <Button size="small" color="primary">
          Show in map
        </Button>
      </CardActions>
    </Card>
  )
}

export default RestaurantCard
