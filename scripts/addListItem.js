import { showTotalIncomes } from "./showTotalIncomes.js";
import { showTotalExpenses } from "./showTotalExpenses.js";

const addListItem = (event, incomesOrExpenses) => {
  event.preventDefault();
  let { name, amount } = event.currentTarget.elements;
  const sumElement = event.target.parentElement.children[3].children[0];

  const editInputName = (e) => {
    console.log(e);
    if (e.key === "Enter") {
      const newValue = e.target.value;
      const li = e.target.parentElement;
      const editNameInput = e.target;
      let spanName = e.target.parentElement.children[0].children[0];

      li.removeChild(editNameInput);

      spanName.textContent = `${newValue} - `;

      e.currentTarget.addEventListener("click", pressEdit);

      spanName.dataset.edit = "on";
    }
  };

  const editInputAmount = (e) => {
    if (e.key === "Enter") {
      let newNameValue = e.target.parentElement.children[1].value;
      let newAmoutValue = e.target.value;
    
      if (newAmoutValue > 0) {
        const li = e.target.parentElement;
        const editNameInput = e.target.parentElement.children[1];
        const editAmountInput = e.target;
        let spanName = e.target.parentElement.children[0].children[0];
        let spanAmount = e.target.parentElement.children[0].children[1];

        li.removeChild(editNameInput);
        li.removeChild(editAmountInput);

        spanName.textContent = `${newNameValue} - `;
        spanAmount.textContent = newAmoutValue;

        if (incomesOrExpenses === "incomes") {
          showTotalIncomes(newAmoutValue, sumElement);
          showSummary();
        } else if (incomesOrExpenses === "expenses") {
          showTotalExpenses(newAmoutValue, sumElement);
          showSummary();
        }

        e.currentTarget.addEventListener("click", pressEdit);

        spanAmount.dataset.edit = "on";
      } else {
        e.target.value = "";
      }
    }
  };

  const pressEdit = (e) => {
    let li = e.target.parentElement;
    let spanName = e.target.parentElement.children[0].children[0];
    let spanAmount = e.target.parentElement.children[0].children[1];
    const inputEditName = document.createElement("input");
    inputEditName.className = "table__list-item-input-edit";
    inputEditName.value = spanName.textContent;
    inputEditName.addEventListener("keypress", editInputName);
    const inputEditAmount = document.createElement("input");
    inputEditAmount.className =
      "table__list-item-input-edit table__list-item-input-edit--small";
    inputEditAmount.setAttribute("type", "number");
    inputEditAmount.setAttribute("min", 0);
    inputEditAmount.value = spanAmount.textContent;

    inputEditAmount.addEventListener("keypress", editInputAmount);

    if (incomesOrExpenses === "incomes") {
      showTotalIncomes(-inputEditAmount.value, sumElement);
      showSummary();
    } else if (incomesOrExpenses === "expenses") {
      showTotalExpenses(-inputEditAmount.value, sumElement);
      showSummary();
    }

    if (spanName.dataset.edit === "on" && spanAmount.dataset.edit === "on") {
      spanName.dataset.edit = "off";
      spanAmount.dataset.edit = "off";

      li.insertBefore(inputEditName, li.childNodes[1]);
      li.insertBefore(inputEditAmount, li.childNodes[2]);

      spanName.textContent = "";
      spanAmount.textContent = "";

      console.log(inputEditName.value);
      console.log(inputEditAmount.value);
    } else if (
      spanName.dataset.edit === "off" &&
      spanAmount.dataset.edit === "off"
    ) {
      const inputEditName = e.target.parentElement.children[1];
      const inputEditAmount = e.target.parentElement.children[2];

      spanName.dataset.edit = "on";
      spanAmount.dataset.edit = "on";

      li.removeChild(inputEditName);
      li.removeChild(inputEditAmount);

      spanName.textContent = `${inputEditName.value} - `;
      spanAmount.textContent = inputEditAmount.value;

      if (incomesOrExpenses === "incomes") {
        showTotalIncomes(spanAmount.textContent, sumElement);
        showSummary();
      } else if (incomesOrExpenses === "expenses") {
        showTotalExpenses(spanAmount.textContent, sumElement);
        showSummary();
      }
    }
  };

  const createListItem = (name, amount) => {
    const li = document.createElement("li");
    li.className = "table__list-item clearfix";

    const paragraphInsideListItem = document.createElement("p");
    paragraphInsideListItem.className = "table__list-item-paragraph";
    li.appendChild(paragraphInsideListItem);

    const spanName = document.createElement("span");
    spanName.className = "table__list-item-name";
    spanName.textContent = `${name} - `;
    spanName.dataset.edit = "on";
    paragraphInsideListItem.appendChild(spanName);

    const spanAmount = document.createElement("span");
    spanAmount.className = "table__list-item-amount";
    spanAmount.textContent = amount;
    spanAmount.dataset.edit = "on";
    paragraphInsideListItem.appendChild(spanAmount);

    const deleteBtn = document.createElement("div");
    deleteBtn.className = "table__list-item-btn table__list-item-btn--delete";
    li.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", (e) => {
      const valueOfLiToDelete =
        e.target.parentElement.children[0].children[1].textContent;
      const elementToDelete = e.target.parentElement;
      ol.removeChild(elementToDelete);

      if (incomesOrExpenses === "incomes") {
        showTotalIncomes(-valueOfLiToDelete, sumElement);
        showSummary();
      } else if (incomesOrExpenses === "expenses") {
        showTotalExpenses(-valueOfLiToDelete, sumElement);
        showSummary();
      }
    });

    const editBtn = document.createElement("div");
    editBtn.className = "table__list-item-btn table__list-item-btn--edit";
    li.appendChild(editBtn);

    editBtn.addEventListener("click", pressEdit);

    const ol = event.target.parentElement.children[2];
    ol.appendChild(li);
  };

  createListItem(name.value, amount.value);

  if (incomesOrExpenses === "incomes") {
    showTotalIncomes(amount.value, sumElement);
  } else if (incomesOrExpenses === "expenses") {
    showTotalExpenses(amount.value, sumElement);
  }

  const showSummary = () => {
    const sumOfIncomsElement = document.querySelector("#sumOfIncomsElement");
    const sumOfExpensesElement = document.querySelector(
      "#sumOfExpensesElement"
    );
    const summaryElement = document.querySelector("#summaryElement");

    if (sumOfIncomsElement.textContent - sumOfExpensesElement.textContent > 0) {
      summaryElement.style.color = "#259625";
      summaryElement.textContent = `Your balance is +${
        sumOfIncomsElement.textContent - sumOfExpensesElement.textContent
      } PLN`;
    } else if (
      sumOfIncomsElement.textContent - sumOfExpensesElement.textContent <
      0
    ) {
      summaryElement.style.color = "#ff6961";
      summaryElement.textContent = `Your balance is ${
        sumOfIncomsElement.textContent - sumOfExpensesElement.textContent
      } PLN`;
    } else {
      summaryElement.style.color = "#06a2de";
      summaryElement.textContent = "Your balance is 0 PLN";
    }
  };
  showSummary();

  // clear the input field
  name.value = "";
  amount.value = "";
};

export { addListItem };
