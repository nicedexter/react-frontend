// @flow

import React, { PureComponent } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class NavbarView extends PureComponent<*> {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Experiment</Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    )
  }
}

export default NavbarView
