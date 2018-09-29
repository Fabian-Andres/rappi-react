import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";

import { updateFilters } from '../../store/actions/filterActions';

import Category from '../Actions/Category';

const sublevel_id = [
  'Casual Shirts',
  'Formal Shirts',
  'Blazers',
  'Polos',
];

class Categories extends Component {

  componentWillMount() {
    this.selectedCategoryes = new Set();
  }

  toggleCategory = (label) => {
    if (this.selectedCategoryes.has(label)) {
      this.selectedCategoryes.delete(label);
  } else {
      this.selectedCategoryes.add(label);
    }

    this.props.updateFilters(Array.from(this.selectedCategoryes));
  }

  createCategory = (label) => (
    <Category
        classes="form-check"
        label={label}
        handleCategoryChange={this.toggleCategory}
        key={label}
    />
  )

  createCategoryes = () => (
    sublevel_id.map(this.createCategory)
  )

  render() {
    return (
      <div className="filters">
        <h4 className="title">Categories:</h4>
        <div className="box-categories">
          {this.createCategoryes()}
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  filters: PropTypes.array,
}

const mapStateToProps = state => ({
  filters: state.filters.items,
})

export default connect(mapStateToProps, { updateFilters })(Categories);
