// Dependences
import React from 'react';
import { Container } from 'reactstrap';

const NotFound = ({ location }) => (
  <Container>
    <h3>404 NotFound for <code>{location.pathname}</code></h3>
  </Container>
);

export default NotFound;
