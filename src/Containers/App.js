// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Header from './../Components/Partials/Header';
import Content from './../Components/Modules/Content';

class App extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired
  }

  render() {
    const { children } = this.props;

    return(
      <div className="App">
        {/*---- Header ----*/}
        <Header />

        <Content body={children} />
      </div>
    );
  }
}

export default App;
