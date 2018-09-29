const formatPrice = (x, currency) => {
  switch(currency) {
  case 'COP':
    return x.toFixed(3).replace(',', '.');
  default:
    return x.toFixed(3);
  }
};

export default {
  formatPrice,
};
