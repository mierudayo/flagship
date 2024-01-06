
export const parseNumber = (value) => parseFloat(value) || 0;

export const calculatePrice = (unitPrice, quantity, taxRate, isTaxInclusive) => {
  let price = unitPrice * quantity;
  if (isTaxInclusive) {
    price /= (1 + taxRate);
  }
  return price;
};

export const calculatePriceWithTax = (price, taxRate) => {
  return price * (1 + taxRate);
}

export const formatCurrency = (value) => {
  const formatter = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  });
  const number = parseNumber(value);
  return formatter.format(number);
};
