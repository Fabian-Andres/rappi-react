// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Header from './../Components/Partials/Header';
import Content from './../Components/Modules/Content';
import Footer from './../Components/Partials/Footer';

// Assets
import './App.scss'

class App extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired
  }

  render() {
    const { children } = this.props;

    return(
      <div className="App">
        <Header />
        <Content body={children} />
        <Footer />
      </div>
    );
  }
}

export default App;
