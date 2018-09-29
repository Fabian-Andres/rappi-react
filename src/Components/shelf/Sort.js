import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { updateSort } from '../../store/actions/sortActions';

import Selectbox from '../Actions/Selectbox';

const sortBy = [
  { value: '',           label: 'Order by'  },
  { value: 'lowestprice', label: 'Lowest to highest' },
  { value: 'highestprice', label: 'Highest to lowest' },
  { value: 'available', label: 'Available to not available' },
  { value: 'notavailable', label: 'Not available to available' },
]

class Sort extends Component {

  handleSort = (value) => {
    this.props.updateSort(value);
  }

  render() {
    return (
      <div className="sort">
        <Selectbox options={sortBy} handleOnChange={this.handleSort}  classes="form-control d-inline" />
      </div>
    );
  }
}

Sort.propTypes = {
  updateSort: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  sort: state.sort.item,
})

export default connect(mapStateToProps, { updateSort })(Sort);
