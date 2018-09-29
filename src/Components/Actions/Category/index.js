import React, { Component } from 'react';
import PropTypes from "prop-types";

import './Category.scss';

class Category extends Component {

  state = {
    isChecked: false,
  }

  toggleCategoryChange = () => {
    const { handleCategoryChange, label } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCategoryChange(label);
  }

  render() {
    const { label, classes } = this.props;
    const { isChecked } = this.state;

    return (
      <div className={classes}>
        <label className="form-check-label">
          <input
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleCategoryChange}
          />
          <span className="form-check-sign"></span>
          <span>{label}</span>
        </label>
      </div>
    );
  }
}

Category.propTypes = {
  label: PropTypes.string.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
};

export default Category;
