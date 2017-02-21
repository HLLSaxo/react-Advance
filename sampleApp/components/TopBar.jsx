import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

function TopBar() {
	return (
    <Navbar inverse collapseOnSelect fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          Open Api - Feature Samples
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href='#' className='nav-items'> LOGIN</NavItem>
          <NavItem eventKey={2} className='nav-items'>
            <Link to='home'>ACCESS TOKEN</Link>
          </NavItem>
          <Navbar.Brand className='pull-topbar-right'>
            <a href='https://developer.saxobank.com/sim/openapi/portal/'
              target='_blank'>
              Developer's Portal
            </a>
          </Navbar.Brand>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
	);
}

export default TopBar;
