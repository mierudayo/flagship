
export const parseNumber = (value) => parseFloat(value) || 0;

export const formatNumber = (value) => {
  const number = parseNumber(value);
  let formattedNumber;

  if (number % 1 !== 0) {
    formattedNumber = number.toLocaleString('ja-JP', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } else {
    formattedNumber = number.toLocaleString('ja-JP');
  }

  if (number < 0) {
    return <span style={{ color: 'red' }}>{formattedNumber}</span>;
  }

  return <span>{formattedNumber}</span>;
};

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
  const formattedNumber = formatter.format(number);

  if (number < 0) {
    return <span style={{ color: 'red' }}>{formattedNumber}</span>;
  }

  return <span>{formattedNumber}</span>;
};
