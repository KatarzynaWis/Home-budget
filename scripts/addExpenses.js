let arrayOfExpenses = [];

const addExpenses = (pln) => {
  let toNumber = Number(pln);
  arrayOfExpenses = [...arrayOfExpenses, toNumber];
  let sum = arrayOfExpenses.reduce((acc, value) => acc + value, 0)

  return sum;
};

export { addExpenses };


