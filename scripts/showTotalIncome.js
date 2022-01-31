import {addIncome} from "./addIncome.js";
  
const showTotalIncome = (value) => {
  const totalIncome = document.querySelector("#totalIncome");
  totalIncome.textContent = addIncome(value).toFixed(2);
}

export {showTotalIncome};