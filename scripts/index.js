"use strict";

import { addListItem } from "./addListItem.js";

window.addEventListener("DOMContentLoaded", () => {

  const formOfIncome = document.querySelectorAll(".table__form")[0];
  const formOfExpenses = document.querySelectorAll(".table__form")[1];

  formOfIncome.addEventListener("submit", (e) => addListItem(e, "Income"));
  formOfExpenses.addEventListener("submit", (e) => addListItem(e, "expenses"));
  
});
