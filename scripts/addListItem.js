import { showTotalIncome } from "./showTotalIncome.js";
import { showTotalExpenses } from "./showTotalExpenses.js";

const addListItem = (event, IncomeOrExpenses) => {
  event.preventDefault();
  let { name, amount } = event.currentTarget.elements;
  const sumElement = event.target.parentElement.children[3].children[0];

  const editInputName = (e) => {
    const li = e.target.parentElement;
    const editNameInput = e.target;
    const editAmountInput = e.target.parentElement.children[2];
    const newValue = e.target.value;
    let spanName = e.target.parentElement.children[0].children[0];
    let spanAmount = e.target.parentElement.children[0].children[1];
    console.log(e);
    if (
      e.key === "Enter" &&
      e.target.value !== "" &&
      editAmountInput.value !== ""
    ) {
      li.removeChild(editNameInput);
      li.removeChild(editAmountInput);

      spanName.textContent = `${newValue} `;
      spanAmount.textContent = editAmountInput.value;

      if (IncomeOrExpenses === "Income") {
        showTotalIncome(editAmountInput.value, sumElement);
        showSummary();
      } else if (IncomeOrExpenses === "expenses") {
        showTotalExpenses(editAmountInput.value, sumElement);
        showSummary();
      }

      spanName.dataset.edit = "on";
      spanAmount.dataset.edit = "on";
    }
  };

  const editInputAmount = (e) => {
    const editNameInput = e.target.parentElement.children[1];

    if (
      e.key === "Enter" &&
      e.target.value !== "" &&
      editNameInput.value !== ""
    ) {
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

        newAmoutValue = Number(newAmoutValue).toFixed(2);

        spanName.textContent = `${newNameValue} `;
        spanAmount.textContent = newAmoutValue;

        if (IncomeOrExpenses === "Income") {
          showTotalIncome(newAmoutValue, sumElement);
          showSummary();
        } else if (IncomeOrExpenses === "expenses") {
          showTotalExpenses(newAmoutValue, sumElement);
          showSummary();
        }

        spanName.dataset.edit = "on";
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
    inputEditName.setAttribute("maxlength", "40");
    inputEditName.setAttribute("required", "");
    inputEditName.addEventListener("keypress", editInputName);

    const inputEditAmount = document.createElement("input");
    inputEditAmount.className =
      "table__list-item-input-edit table__list-item-input-edit--small";
    inputEditAmount.setAttribute("type", "number");
    inputEditAmount.setAttribute("min", "0");
    inputEditAmount.setAttribute("step", "0.01");
    inputEditAmount.setAttribute("required", "");
    inputEditAmount.value = spanAmount.textContent;
    inputEditAmount.addEventListener("keypress", editInputAmount);

    if (IncomeOrExpenses === "Income") {
      showTotalIncome(-inputEditAmount.value, sumElement);
      showSummary();
    } else if (IncomeOrExpenses === "expenses") {
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
    } else if (
      spanName.dataset.edit === "off" &&
      spanAmount.dataset.edit === "off"
    ) {
      spanName.dataset.edit = "on";
      spanAmount.dataset.edit = "on";
      const inputEditN = e.target.parentElement.children[1];
      const inputEditA = e.target.parentElement.children[2];
      const nameValue = inputEditN.value;
      let amountValue = inputEditA.value;


      if (nameValue !== "" && amountValue !== "") {
        li.removeChild(inputEditN);
        li.removeChild(inputEditA);

        amountValue = Number(amountValue).toFixed(2);

        spanName.textContent = `${nameValue} `;
        spanAmount.textContent = amountValue;

        if (IncomeOrExpenses === "Income") {
          showTotalIncome(spanAmount.textContent, sumElement);
          showSummary();
        } else if (IncomeOrExpenses === "expenses") {
          showTotalExpenses(spanAmount.textContent, sumElement);
          showSummary();
        }
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
    spanName.textContent = `${name} `;
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

      if (IncomeOrExpenses === "Income") {
        showTotalIncome(-valueOfLiToDelete, sumElement);
        showSummary();
      } else if (IncomeOrExpenses === "expenses") {
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

  if (IncomeOrExpenses === "Income") {
    showTotalIncome(amount.value, sumElement);
  } else if (IncomeOrExpenses === "expenses") {
    showTotalExpenses(amount.value, sumElement);
  }

  const showSummary = () => {
    const totalIncome = document.querySelector("#totalIncome");
    const totalExpenses = document.querySelector("#totalExpenses");
    const summaryElement = document.querySelector("#summaryElement");

    if (totalIncome.textContent - totalExpenses.textContent > 0) {
      summaryElement.style.color = "#259625";
      summaryElement.textContent = `Your balance is +${
        totalIncome.textContent - totalExpenses.textContent
      } PLN`;
    } else if (totalIncome.textContent - totalExpenses.textContent < 0) {
      summaryElement.style.color = "#ff6961";
      summaryElement.textContent = `Your balance is ${
        totalIncome.textContent - totalExpenses.textContent
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
