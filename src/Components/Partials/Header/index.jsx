// Dependencies
import React from 'react';
import { Collapse, NavbarToggler, Nav } from 'reactstrap';
import { NavLink } from 'react-router-dom';

// Assets
import './Header.scss';
import logo from './../../../Assets/images/logo.svg';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <header>
        <div className="container">
          <div className="row">
            <nav className="navbar navbar-expand-lg navbar-light w-100">
              <NavLink className="navbar-brand mr-auto" to="/">
                <img src={logo} alt="logo" className="logo-header"/>
              </NavLink>
              <NavbarToggler onClick={this.toggleNavbar} className="mr-2 navbar-toggler" />
              <Collapse className="collapse navbar-collapse" id="navbarSupportedContent" isOpen={!this.state.collapsed}>
                <Nav navbar className="navbar-nav justify-content-end ml-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" exact  rel="noopener noreferrer" to="/">Home</NavLink>
                  </li>
                </Nav>
              </Collapse>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}
