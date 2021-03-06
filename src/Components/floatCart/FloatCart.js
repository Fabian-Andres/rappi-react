// Dependences
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadCart, removeProduct } from '../../store/actions/floatCartActions';
import { updateCart } from '../../store/actions/updateCartActions';

// Components
import CartProduct from './CartProduct';
import persistentCart from "../../persistentCart";
import util from '../../util';

// Assets
import './FloatCart.scss';


class FloatCart extends Component {

  state = {
    isOpen: false,
  };

  componentWillMount() {
    this.props.loadCart( JSON.parse(persistentCart().get()) || [] );
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.updateCart(this.props.cartProducts);
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newProduct !== this.props.newProduct) {
      this.addProduct(nextProps.newProduct);
    }

    if (nextProps.productToRemove !== this.props.productToRemove) {
      this.removeProduct(nextProps.productToRemove);
    }
  }

  openFloatCart = () => {
    this.setState({ isOpen: true });
  }

  closeFloatCart = () => {
    this.setState({ isOpen: false });
  }

  addProduct = (product) => {
    const { cartProducts, updateCart } = this.props;
    let productAlreadyInCart = false;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.quantity += product.quantity;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      cartProducts.push(product);
    }

    updateCart(cartProducts);
    this.openFloatCart();
  }

  removeProduct = (product) => {
    const { cartProducts, updateCart } = this.props;

    const index = cartProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  }

  proceedToCheckout = () => {
    const { totalPrice, productQuantity, currencyId } = this.props.cartTotals;

    if (!productQuantity) {
      alert('Add some product in the bag!');
    }else {
      alert(`Checkout - Subtotal: $${util.formatPrice(totalPrice, currencyId)}`);
    }
  }

  render() {
    const { cartTotals, cartProducts, removeProduct } = this.props;
    const currencyId = "COP";
    const currencyFormat = "$";


    const products = cartProducts.map(p => {
      return (
        <CartProduct
          product={p}
          removeProduct={removeProduct}
          key={p.id}
        />
      );
    });

    let classes = ['float-cart'];

    if (!!this.state.isOpen) {
      classes.push('float-cart--open');
    }

    return (
      <div className={classes.join(' ')}>
        {/* If cart open, show close (x) button */}
        {this.state.isOpen && (
          <div
            onClick={() => this.closeFloatCart()}
            className="float-cart__close-btn close"
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </div>
        )}

        {/* If cart is closed, show bag with quantity of product and open cart action */}
        {!this.state.isOpen && (
          <span
            onClick={() => this.openFloatCart()}
            className="bag bag--float-cart-closed"
          >
            <span className="bag__quantity">{cartTotals.productQuantity}</span>
          </span>
        )}

        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">
                {cartTotals.productQuantity}
              </span>
            </span>
            <div className="header-title">
              <small>Your order in</small>
              <h3>Rappi</h3>
            </div>
          </div>

          <div className="float-cart__shelf-container">
            {products}
            {!products.length && (
              <div className="shelf-empty">
                <h5>Add some product in the bag </h5>
                <p>
                  We invite you to return to our stores and add products to your basket
                </p>
              </div>
            )}
          </div>

          <div className="float-cart__footer">
            <div className="sub">SUBTOTAL</div>
            <div className="sub-price">
              <p className="sub-price__val">
                {`${currencyFormat} ${util.formatPrice(cartTotals.totalPrice, currencyId)}`}
              </p>
              <small className="sub-price__installment">
                {!!cartTotals.installments && (
                  <span>
                    {`OR UP TO ${cartTotals.installments} x ${currencyFormat} ${util.formatPrice(cartTotals.totalPrice / cartTotals.installments, currencyId)}`}
                  </span>
                )}
              </small>
            </div>
            <div onClick={() => this.proceedToCheckout()} className="btn btn-primary btn-lg btn-block">
              Checkout
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FloatCart.propTypes = {
  loadCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  cartProducts: PropTypes.array.isRequired,
  newProduct: PropTypes.object,
  removeProduct: PropTypes.func,
  productToRemove: PropTypes.object,
};

const mapStateToProps = state => ({
  cartProducts: state.cartProducts.items,
  newProduct: state.cartProducts.item,
  productToRemove: state.cartProducts.itemToRemove,
  cartTotals: state.cartTotals.item,
});

export default connect(mapStateToProps, { loadCart, updateCart, removeProduct})(FloatCart);
