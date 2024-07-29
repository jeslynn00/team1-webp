document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const accountBalanceElement = document.getElementById("accountBalance");
    const lastTransactionElement = document.getElementById("lastTransaction");
    const transactionHistoryElement = document.getElementById("transactionHistory");
    const addFundsForm = document.getElementById("addFundsForm");
    const makePaymentForm = document.getElementById("makePaymentForm");

    // Retrieve balance and transactions from localStorage
    let balance = parseFloat(localStorage.getItem("balance")) || 1500.00;
    const transactions = JSON.parse(localStorage.getItem("transactions")) || ["$50.00 to Health Clinic on 07/15/2024"];

    // Helper functions
    const updateBalance = () => {
        if (accountBalanceElement) {
            accountBalanceElement.textContent = `$${balance.toFixed(2)}`;
        }
    };

    const updateLastTransaction = () => {
        if (lastTransactionElement) {
            lastTransactionElement.textContent = `Last transaction: ${transactions[transactions.length - 1] || "None"}`;
        }
    };

    const updateTransactionHistory = () => {
        if (transactionHistoryElement) {
            transactionHistoryElement.innerHTML = transactions.map(transaction => `<li>${transaction}</li>`).join("");
        }
    };

    // Update page with initial values
    updateBalance();
    updateLastTransaction();
    updateTransactionHistory();

    // Add Funds
    if (addFundsForm) {
        addFundsForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const amount = parseFloat(document.getElementById("amount").value);
            if (!isNaN(amount) && amount > 0) {
                balance += amount;
                localStorage.setItem("balance", balance.toFixed(2));
                alert("Funds added successfully!");
                updateBalance(); // Update balance on the page
                document.getElementById("amount").value = ""; // Clear the input field
            } else {
                alert("Please enter a valid amount.");
            }
        });
    }

    // Make Payment
    if (makePaymentForm) {
        makePaymentForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const recipient = document.getElementById("recipient").value;
            const amount = parseFloat(document.getElementById("amount").value);
            if (!isNaN(amount) && amount > 0 && recipient) {
                if (amount <= balance) {
                    balance -= amount;
                    const transaction = `$${amount.toFixed(2)} to ${recipient} on ${new Date().toLocaleDateString()}`;
                    transactions.push(transaction);
                    localStorage.setItem("balance", balance.toFixed(2));
                    localStorage.setItem("transactions", JSON.stringify(transactions));
                    alert("Payment made successfully!");
                    updateBalance(); // Update balance on the page
                    updateTransactionHistory(); // Update transaction history on the page
                    document.getElementById("recipient").value = ""; // Clear the input field
                    document.getElementById("amount").value = ""; // Clear the input field
                } else {
                    alert("Insufficient funds.");
                }
            } else {
                alert("Please enter valid details.");
            }
        });
    }
});
