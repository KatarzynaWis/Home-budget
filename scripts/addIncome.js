let arrayOfIncome = [];

const addIncome = (pln) => {
  let toNumber = Number(pln);
  arrayOfIncome = [...arrayOfIncome, toNumber];
  let sum = arrayOfIncome.reduce((acc, value) => acc + value, 0)

  return sum;
};

export { addIncome };


