import {addExpenses} from "./addExpenses.js";
  
const showTotalExpenses = (value) => {
  const totalExpenses = document.querySelector("#totalExpenses");
  totalExpenses.textContent = addExpenses(value);
}

export {showTotalExpenses};