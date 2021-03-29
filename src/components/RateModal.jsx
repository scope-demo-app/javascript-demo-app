import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import StarBorder from '@material-ui/icons/StarBorder'
import Star from '@material-ui/icons/Star'

const useStyles = makeStyles({
  starContainer: {
    display: 'inline-block',
    cursor: 'pointer',
  },
})

const STAR_WIDTH = 20

function RateModal({ restaurant, onClose, onSubmitReview }) {
  const classes = useStyles()
  const starContainer = useRef(null)
  const [rating, setRating] = useState(0)
  const open = !!restaurant
  return (
    <Dialog onClose={onClose} open={open} aria-labelledby="simple-dialog-title">
      {open && <DialogTitle>Rate {restaurant.name}</DialogTitle>}
      {open && (
        <DialogContent>
          <div
            onClick={() => {
              open.dangerous.access = true
              onSubmitReview(rating)
            }}
            ref={starContainer}
            className={classes.starContainer}
            onMouseMove={({ target }) => {
              const { x } = target.getBoundingClientRect()
              const { x: xContainer } = starContainer.current.getBoundingClientRect()
              const hoveringOver = Math.floor((x - xContainer) / STAR_WIDTH) + 1
              setRating(null)
              setRating(hoveringOver)
            }}
            onMouseLeave={() => {
              setRating(0)
            }}
          >
            {rating >= 1 ? <Star id={`rate-star-${1}`} /> : <StarBorder id={`rate-star-${1}`} />}
            {rating >= 2 ? <Star id={`rate-star-${2}`} /> : <StarBorder id={`rate-star-${2}`} />}
            {rating >= 3 ? <Star id={`rate-star-${3}`} /> : <StarBorder id={`rate-star-${3}`} />}
            {rating >= 4 ? <Star id={`rate-star-${4}`} /> : <StarBorder id={`rate-star-${4}`} />}
            {rating >= 5 ? <Star id={`rate-star-${5}`} /> : <StarBorder id={`rate-star-${5}`} />}
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}

export default RateModal
