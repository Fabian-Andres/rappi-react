import React, { Component } from 'react';
import PropTypes from "prop-types";

import Thumb from "./../Thumb";

import util from '../../util';


class CartProduct extends Component {

  state = {
    isMouseOver: false,
  }

  handleMouseOver = () => {
    this.setState({isMouseOver: true});
  }

  handleMouseOut = () => {
    this.setState({isMouseOver: false});
  }


  render(){
    const { product, removeProduct } = this.props;

    const classes = ['shelf-item'];

    if(!!this.state.isMouseOver){
      classes.push('shelf-item--mouseover');
    }

    return (
      <div className={classes.join(" ")}>
        <div
          className="shelf-item__del"
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          onClick={() => removeProduct(product)}
        >
          <i className="now-ui-icons ui-1_simple-remove"></i>
        </div>
        <Thumb
          classes="shelf-item__thumb"
          src={require('../../static/products/img-not-found.svg')}
          alt={product.name}
        />
        <div className="shelf-item__details">
          <p className="title">{product.name}</p>
          <p className="desc">
            {/* ${/*product.sublevel_id[0]*/} | */}
            {`${product.style}`} <br />
            <small>Quantity: {product.quantity}</small>
          </p>
        </div>
        <div className="shelf-item__price">
          <p>{`${product.currencyFormat}  ${util.formatPrice(product.price)}`}</p>
        </div>

        <div className="clearfix" />
      </div>
    );
  }
}


CartProduct.propTypes = {
  product: PropTypes.object.isRequired,
  removeProduct: PropTypes.func.isRequired,
};

export default CartProduct;
