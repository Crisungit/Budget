let showBalance = document.getElementById("balance");
const button = document.getElementById("btn1");
const balanceBox = document.getElementById("balance-box");
const transactionList = document.getElementById("transaction-list");

let allTransactions = [];
let totalSaldo = 0;

class Transactions {
	constructor(description, sum) {
		this.description = description;
		this.sum = sum;
	}
}

window.onload = () => {
	updateTotal();
};

button.addEventListener("click", () => {
	const description = document.getElementById("description").value;
	const sum = document.getElementById("sum").value;

	const transaction = new Transactions(description, parseFloat(sum));
	allTransactions.push(transaction);
	createList();
	updateTotal();

	document.getElementById("description").value = "";
	document.getElementById("sum").value = "";
});

function createList() {
	transactionList.innerHTML = allTransactions
		.map((data, index) => {
			let value = data.sum > 0 ? "income" : "expense";
			return `<li class="${value}">${data.description} ${data.sum}€ 
                    <button onclick="Remove(${index})">remove</button></li>`;
		})
		.join("");
}

function Remove(index) {
	allTransactions.splice(index, 1);
	updateTotal();
	createList();
}

function updateTotal() {
	totalSaldo = 0;
	totalSaldo += allTransactions.reduce(
		(acc, transaction) => acc + transaction.sum,
		0
	);
	if (totalSaldo >= 0) {
		balanceBox.classList.replace("negative", "positive");
	} else {
		balanceBox.classList.replace("positive", "negative");
	}
	showBalance.textContent = `${totalSaldo.toFixed(2)}€`;
}
