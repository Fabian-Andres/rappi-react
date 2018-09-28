// Dependencies
import React from 'react';
import { Container, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';

// Assets
import './Header.scss';
import logo from './../../../Assets/images/logo.svg';

export default class Header extends React.Component {

  render() {
    return (
      <header>
        <Container fluid>
          <Row>
            <nav className="navbar navbar-expand-lg navbar-light w-100">
              <NavLink className="navbar-brand mr-auto" to="/">
                <img src={logo} alt="logo" className="logo-header"/>
              </NavLink>
            </nav>
          </Row>
        </Container>
      </header>
    );
  }
}
