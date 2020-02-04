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

function RestaurantForm({ onSubmitRestaurant }) {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])

  function handleUploadImage({ target }) {
    for (let file of target.files) {
      let fileReader = new FileReader()
      if (images.find(({ name }) => name === file.name)) {
        return
      }
      fileReader.readAsDataURL(file)
      fileReader.onload = ({ target: { result } }) => {
        const [, data] = result.split(',')
        setImages(previousImages => [
          ...previousImages,
          { name: file.name, mimeType: file.type, data },
        ])
      }
    }
  }

  async function onSubmit(event) {
    event.preventDefault()
    const newRestaurant = await submitRestaurant({
      restaurant: {
        name,
        description,
        images,
      },
    })
    onSubmitRestaurant(newRestaurant)
    setName('')
    setDescription('')
    setImages([])
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
          {images.map(({ name }) => (
            <span key={name}>{name}</span>
          ))}
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="imageUpload"
            multiple
            type="file"
            onChange={handleUploadImage}
          />
          <label htmlFor="imageUpload">
            <Button component="span">Upload Photos</Button>
          </label>
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default RestaurantForm
