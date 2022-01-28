import {addExpenses} from "./addExpenses.js";
  
const showTotalExpenses = (value) => {
  const sumOfExpensesElement = document.querySelector("#sumOfExpensesElement");
  sumOfExpensesElement.textContent = addExpenses(value);
}

export {showTotalExpenses};