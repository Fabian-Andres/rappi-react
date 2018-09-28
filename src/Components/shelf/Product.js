// Dependences
import React from 'react';
import PropTypes from "prop-types";

import Thumb from '../Thumb';

import util from '../../util';


const Product = (props) => {
  const product = props.product;

  // an input component can alter the amount in the future
  product.quantity = 1;

  let formattedPrice = util.formatPrice(product.price, product.currencyId);

  let productInstallment;

  if(!!product.installments) {
    const installmentPrice = (product.price / product.installments);

    productInstallment = (
      <div className="installment">
        <span>or {product.installments} x</span><b> {product.currencyFormat} {util.formatPrice(installmentPrice, product.currencyId)}</b>
      </div>
    );
  }

  return (
    <div className="shelf-item" data-id={product.id}>
      {!product.available &&
        <div className="shelf-stopper">no available </div>
      }
      <Thumb
        classes="shelf-item__thumb"
        src={require('../../static/products/img-not-found.svg')}
        alt={product.name}
      />
      <div className="pr-2 pl-2">
        <p className="shelf-item__title">{product.name}</p>
        <div className="shelf-item__price">
          <div className="val"><small>{product.currencyFormat}</small>
            <b>
              {formattedPrice.substr(0, formattedPrice.length - 3)}
            </b>
            <span>
              {formattedPrice.substr(formattedPrice.length - 3, 3)}
            </span>
          </div>
          {productInstallment}
        </div>
        <div onClick={() => props.addProduct(product)} className="btn btn-success btn-block">Add to cart</div>
      </div>
    </div>
  );
}


Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
};

export default Product;
