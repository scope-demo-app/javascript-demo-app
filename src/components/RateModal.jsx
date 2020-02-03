import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

function RateModal({ restaurant, onClose }) {
  const open = !!restaurant
  return (
    <Dialog onClose={onClose} open={open} aria-labelledby="simple-dialog-title">
      {open && <DialogTitle>Rate {restaurant.name}</DialogTitle>}
    </Dialog>
  )
}

export default RateModal
