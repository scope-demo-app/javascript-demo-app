import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import StarRateIcon from '@material-ui/icons/StarRate'
import StarHalfIcon from '@material-ui/icons/StarHalf'

const useStyles = makeStyles({
  root: {
    width: 345,
    marginBottom: 20,
    marginRight: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 140,
  },
  links: {
    display: 'flex',
    justifyContent: 'space-between',
  },
})

function Rating({ rating, name }) {
  const rounded = Math.floor(rating)
  const showHalf = rating - rounded > 0.5
  return (
    <>
      {Array.from({ length: rounded }).map((el, i) => (
        <StarRateIcon key={i} className={`current-rate-${name}`} />
      ))}
      {showHalf && <StarHalfIcon style={{ width: '20px' }} />}
    </>
  )
}

function RestaurantCard({ restaurant, onRateRestaurant, onDelete, onSelect }) {
  const classes = useStyles()
  if (!restaurant) {
    return null
  }
  const { name, images, rating, description, latitude, longitude } = restaurant

  const [mainPhoto] = images
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={onSelect}>
        <CardMedia className={classes.media} image={mainPhoto} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" id={name}>
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Rating rating={rating} name={name} />
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.links}>
        <Button size="small" color="primary" onClick={onRateRestaurant} id={`rate-${name}`}>
          Rate
        </Button>
        <Link
          variant="body2"
          href={`https://maps.google.com/?q=${latitude},${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Show in map
        </Link>
        <Button size="small" color="primary" onClick={onDelete} id={`delete-${name}`}>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default RestaurantCard
