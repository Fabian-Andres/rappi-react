// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import store from './../../store';

class Content extends React.Component {
  static propTypes = {
    body: PropTypes.object.isRequired
  }

  render() {
    const { body } = this.props;

    return(
      <Provider store={store}>
        <div className="Content">
          {body}
        </div>
      </Provider>
    );
  }
}

export default Content;
