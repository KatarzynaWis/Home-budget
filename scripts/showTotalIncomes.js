import {addIncomes} from "./addIncomes.js";
  
const showTotalIncomes = (value) => {
  const sumOfIncomsElement = document.querySelector("#sumOfIncomsElement");
  sumOfIncomsElement.textContent = addIncomes(value);
}

export {showTotalIncomes};