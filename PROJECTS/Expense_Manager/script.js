// expense, income, all buttons
const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

// input/add income, expense
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

//all-income-expense tabs
const incomeTab = document.querySelector("#income");
const expenseTab = document.querySelector("#expense");
const allTab = document.querySelector("#all");

//all-income-expense list
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

//values
const balanceAmnt = document.querySelector(".balance .value");
const incomeTotalAmnt = document.querySelector(".total-income");
const outcomeTotalAmnt = document.querySelector(".total-outcome");

//variables & create localstorage
let balance = 0,
    totalIncome = 0,
    totalSpent = 0;

// let BudgetManager = JSON.parse(localStorage.getItem("budget_manager")) || [];
let budget_manager;
if (localStorage.getItem("budget_manager") === null) {
    budget_manager = [];
} else {
    budget_manager = JSON.parse(localStorage.getItem("budget_manager"));
}

showEntries();

/* EXPENSE INCOME ALL TAB SHOW HIDE FUNCTIONALITY START*/
expenseTab.classList.add("hide");
incomeTab.classList.add("hide");

expenseBtn.addEventListener("click", function() {
    // expenseBtn.classList.add("active");
    // incomeBtn.classList.remove("active");
    // allBtn.classList.remove("active");

    // expenseTab.classList.remove("hide");
    // incomeTab.classList.add("hide");
    // allTab.classList.add("hide");
    show(expenseTab)
    hide([incomeTab, allTab]);
    active(expenseBtn);
    inactive([incomeBtn, allBtn]);
});
incomeBtn.addEventListener("click", function() {
    // incomeBtn.classList.add("active");
    // expenseBtn.classList.remove("active");
    // allBtn.classList.remove("active");

    // expenseTab.classList.add("hide");
    // incomeTab.classList.remove("hide");
    // allTab.classList.add("hide");
    show(incomeTab)
    hide([expenseTab, allTab]);
    active(incomeBtn);
    inactive([expenseBtn, allBtn]);
});
allBtn.addEventListener("click", function() {
    // allBtn.classList.add("active");
    // incomeBtn.classList.remove("active");
    // expenseBtn.classList.remove("active");

    // expenseTab.classList.add("hide");
    // incomeTab.classList.add("hide");
    // allTab.classList.remove("hide");
    show(allTab)
    hide([incomeTab, expenseTab]); //pass arguments as array
    active(allBtn);
    inactive([incomeBtn, expenseBtn]);
});

// Show/hide elements in TABS
function show(element) {
    element.classList.remove("hide");
}

function hide(elements) {
    elements.forEach(element => {
        element.classList.add("hide");
    })
}

function active(element) {
    element.classList.add("active");
}

function inactive(elements) {
    elements.forEach(element => {
        element.classList.remove("active");
    })
}
/* EXPENSE INCOME ALL TAB SHOW HIDE FUNCTIONALITY END */

/* ADD INCOME */
addIncome.addEventListener("click", function() {

    //check if one of the input field is empty then exit
    if (!incomeAmount.value || !incomeTitle.value)
        return;

    //here, means input fields are filled so save entries
    let income = {
        type: "income",
        title: incomeTitle.value,
        amount: parseFloat(incomeAmount.value)
    }
    console.log(income);
    budget_manager.push(income);
    localStorage.setItem("budget_manager", JSON.stringify(budget_manager));

    showEntries();

    incomeAmount.value = "";
    incomeTitle.value = "";
});

/* ADD EXPENSE */
addExpense.addEventListener("click", function() {

    //check if one of the input field is empty then exit
    if (!expenseAmount.value || !expenseTitle.value)
        return;

    //here, means input fields are filled so save entries
    let expense = {
        type: "expense",
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value)
    }
    console.log(expense);
    budget_manager.push(expense);
    localStorage.setItem("budget_manager", JSON.stringify(budget_manager));

    showEntries();

    expenseAmount.value = "";
    expenseTitle.value = "";
});


function calculateTotal(type, entryList) {
    let sum = 0;

    entryList.forEach(i => {
        if (i.type == type) {
            sum += i.amount;
        }
    })
    return sum;
}

// function entriesTabData(list, type, title, amount, id) {

// }

// EDIT or DELETE
incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);
allList.addEventListener("click", deleteOrEdit);

function deleteOrEdit(e) {
    // console.log(e.target);
    // console.log((e.target).parentNode);
    // console.log((e.target).parentNode.parentNode);
    // console.log(e.target.id);

    const targetBtn = e.target;
    const entry = targetBtn.parentNode.parentNode;
    if (targetBtn.id == "DELETE") {
        deleteEntry(entry);
    } else if (targetBtn.id == "EDIT") {
        editEntry(entry);
    }
}

function deleteEntry(entry) {
    // budget_manager.splice((entry.id), 1);
    // console.log(entry);
    // console.log(entry.id);
    // console.log(budget_manager.splice(entry.id, 1));
    budget_manager.splice(entry.id, 1);
    localStorage.setItem("budget_manager", JSON.stringify(budget_manager));
    entry.remove();
    showEntries();

    // console.log(Array.prototype.splice.call(budget_manager, entry.id, 1));
    // Array.prototype.splice.call(budget_manager, entry.id, 1);


    // console.log(budget_manager[entry.id]);
}

function editEntry(entry) {
    console.log(entry);
    let entryIs = budget_manager[entry.id];

    if (entryIs.type === "income") {
        incomeAmount.value = entryIs.amount;
        incomeTitle.value = entryIs.title;
    } else if (entryIs.type === "expense") {
        expenseAmount.value = entryIs.amount;
        expenseTitle.value = entryIs.title;
    }
    deleteEntry(entry);
}
//function to get entries and update them on UI
function showEntries() {
    //calculate total income, balance and outcome
    totalIncome = calculateTotal("income", budget_manager);
    totalSpent = calculateTotal("expense", budget_manager);
    balance = Math.abs(totalIncome - totalSpent);

    //negative or positive cash sigh
    let sign = (totalIncome >= totalSpent) ? "₹" : "-₹";

    //update balance, income & spent amounts
    incomeTotalAmnt.innerHTML = '<small>₹</small>' + totalIncome;
    outcomeTotalAmnt.innerHTML = '<small>₹</small>' + totalSpent;
    balanceAmnt.innerHTML = '<small>' + sign + '</small>' + balance;

    //INCOME< ALL< EXPENSE list items
    budget_manager.forEach((entry, index) => {
        if (entry.type === "expense") { //show expenses
            const ex = ` <li id = "${index}" class="${entry.type}">
                        <div class="entry">${entry.title}: $${entry.amount}</div>
                        <div class="delEdit">
                        <i class="fas fa-edit" id="EDIT"></i>
                        <i class="fas fa-trash" id="DELETE"></i>
                        </div>
                    </li>`;

            /*
            insertAdjacentHTML() parses the specified text 
            as HTML or XML and inserts the resulting nodes into 
            the DOM tree at a specified position.
            */
            expenseList.insertAdjacentHTML("afterbegin", ex);
            // entriesTabData(expenseList, entry.type, entry.title, entry.amount, index);
        } else if (entry.type === "income") { //show incomes
            const inc = ` <li id = "${index}" class="${entry.type}">
                        <div class="entry">${entry.title}: $${entry.amount}</div>
                        <div class="delEdit">
                        <i class="fas fa-edit" id="EDIT"></i>
                        <i class="fas fa-trash" id="DELETE"></i>
                        </div>
                    </li>`;
            incomeList.insertAdjacentHTML("afterbegin", inc);
            // entriesTabData(incomeList, entry.type, entry.title, entry.amount, index);
        }
        //show both
        const all = ` <li id = "${index}" class="${entry.type}">
                        <div class="entry">${entry.title}: $${entry.amount}</div>
                        <div class="delEdit">
                        <i class="fas fa-trash" id="DELETE"></i>
                        </div>
                    </li>`;
        allList.insertAdjacentHTML("afterbegin", all);
        // entriesTabData(allList, entry.type, entry.title, entry.amount, index);
    })
}