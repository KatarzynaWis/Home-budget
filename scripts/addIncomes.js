let arrayOfIncomes = [];

const addIncomes = (pln) => {
  let toNumber = Number(pln);
  arrayOfIncomes = [...arrayOfIncomes, toNumber];
  let sum = arrayOfIncomes.reduce((acc, value) => acc + value, 0)

  return sum;
};

export { addIncomes };


