"use strict";

import { addListItem } from "./addListItem.js";

window.addEventListener("DOMContentLoaded", () => {

  const formOfIncomes = document.querySelectorAll(".table__form")[0];
  const formOfExpenses = document.querySelectorAll(".table__form")[1];

  formOfIncomes.addEventListener("submit", (e) => addListItem(e, "incomes"));
  formOfExpenses.addEventListener("submit", (e) => addListItem(e, "expenses"));
  
});
