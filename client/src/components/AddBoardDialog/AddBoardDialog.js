// AddBoardDialog / AddBoardDialog.js

import React from 'react'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContextText,
  DialogTitle
} from 'material-ui/Dialog'

import { set_add_board_modal_open } from '../../actions/ui.js'

import './AddBoardDialog.css'

class AddBoardModal extends React.Component {

  state = {
    value: null,
    error: false
  }


  handle_close = () => {
    const { dispatch } = this.props
    dispatch(set_add_board_modal_open(false))
    this.reset()
  }

  handle_create = () => {
    const error = this.check_and_set_error()
    if (!error) {
      console.log("todo")
    }
  }

  handle_change = (e) => {
    const value = e.target.value
    this.check_and_set_error()
    this.setState({ value })
  }

  reset = () => {
    this.setState({ value: null, error: false })
  }

  check_and_set_error = () => {
    const error = this.state.value === null || this.state.value === ''
    this.setState({ error })
    return error
  }

  render() {

    const { open } = this.props
    const { error } = this.state

    return (
      <Dialog
        className="dialog-container"
        open={open}
        onClose={this.handle_close}
      >
        <DialogTitle>Create new board</DialogTitle>
        <DialogContent>
          <TextField
            error={error}
            onChange={this.handle_change}
            margin="dense"
            label="Board name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handle_close}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.handle_create}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )

  }

}

const map_state_to_props = state => {
  return { open: state.ui.add_board_modal_open }
}

export default connect(map_state_to_props)(AddBoardModal)