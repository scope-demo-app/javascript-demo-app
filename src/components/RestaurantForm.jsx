import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { submitRestaurant } from '../api'

const useStyles = makeStyles(theme => ({
  Card: {
    maxWidth: 500,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}))

function RestaurantForm() {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [rating, setRating] = useState(3)
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [photos, setPhotos] = useState([])

  function handleUploadImage({ target }) {
    for (let file of target.files) {
      let fileReader = new FileReader()
      if (photos.find(({ name }) => name === file.name)) {
        return
      }
      fileReader.readAsDataURL(file)
      fileReader.onload = ({ target: { result } }) => {
        setPhotos(previousPhotos => [...previousPhotos, { name: file.name, blob: result }])
      }
    }
  }

  function onSubmit(event) {
    event.preventDefault()
    submitRestaurant('http://localhost:8000', {
      name,
      rating,
      description,
      photos,
    })
  }

  return (
    <Card className={classes.Card}>
      <CardContent>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={onSubmit}>
          <Typography gutterBottom variant="h4" component="h4">
            Submit a new restaurant
          </Typography>
          <TextField
            required
            id="name"
            label="Name"
            onChange={({ target: { value } }) => setName(value)}
            value={name}
          />
          <TextField
            id="rating"
            label="Rating"
            type="number"
            inputProps={{
              min: '1',
              max: '5',
            }}
            value={rating}
            onChange={({ target: { value } }) => setRating(value)}
          />
          <TextField
            id="description"
            label="Description"
            multiline
            rowsMax="4"
            value={description}
            inputProps={{
              maxLength: '200',
            }}
            onChange={({ target: { value } }) => setDescription(value)}
          />
          <TextField
            id="location"
            label="Location"
            value={location}
            inputProps={{
              maxLength: '200',
            }}
            onChange={({ target: { value } }) => setLocation(value)}
          />
          {photos.map(({ name }) => (
            <span key={name}>{name}</span>
          ))}
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="file"
            multiple
            type="file"
            onChange={handleUploadImage}
          />
          <label htmlFor="file">
            <Button component="span">Upload Photos</Button>
          </label>
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default RestaurantForm
