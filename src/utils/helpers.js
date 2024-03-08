export const formatCurrency = (value) =>
  new Intl.NumberFormat('id', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

export const getInitials = (username) => {
  const nameArray = username.split(' ');
  const initialsNumber = nameArray.length > 2 ? 2 : nameArray.length;
  let initials = '';

  for (let i = 0; i < initialsNumber; i++) {
    initials += nameArray[i].charAt(0);
  }

  return initials;
};

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
