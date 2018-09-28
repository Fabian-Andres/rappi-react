import { FETCH_PRODUCTS } from './types';
import axios from 'axios';


const productsAPI = 'https://api.myjson.com/bins/zos14';
// const productsAPI = 'https://api.myjson.com/bins/zqx6w';


const compare = {
  'lowestprice': (a, b) => {
    if (a.price < b.price)
      return -1;
    if (a.price > b.price)
      return 1;
    return 0;
  },
  'highestprice': (a, b) => {
    if (a.price > b.price)
      return -1;
    if (a.price < b.price)
      return 1;
    return 0;
  },
  'available': (a, b) => {
    if (a.available > b.available)
      return -1;
    if (a.available < b.available)
      return 1;
    return 0;
  },
  'notavailable': (a, b) => {
    if (a.available < b.available)
      return -1;
    if (a.available > b.available)
      return 1;
    return 0;
  }
};

export const fetchProducts = (filters, sortBy, callback) => dispatch => {

  axios.get(productsAPI)
    .then(res => {
      let { products } = res.data;

      if(!!filters && filters.length > 0){
        products = products.filter( p => filters.find( f => p.sublevel_id.find( size => size === f ) ) );
      }

      if(sortBy){
        products = products.sort(compare[sortBy]);
      }

      if(callback) {
        callback();
      }

      return dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      });

    })
    .catch(err => {
      console.log(err);
      throw new Error('Could not fetch products. Try again later.');
    });
};
