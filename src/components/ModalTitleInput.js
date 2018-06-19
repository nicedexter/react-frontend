// @flow

import React from 'react'
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap'

export default ({ handleClose, handleSave, error }) => (
  <div className="static-modal">
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Please enter a title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <FormGroup controlId="formTitleCurrentModel">
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter title"
              inputRef={ref => { this.input = ref; }}
            />
          </FormGroup>
          <HelpBlock>{error}</HelpBlock>

        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
        <Button bsStyle="primary" onClick={(event) => handleSave(event, this.input.value)}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  </div>
)
