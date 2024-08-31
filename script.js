// Adding more expense fields
        document.getElementById("addExpenseButton").addEventListener("click", function() {
            const expensesContainer = document.getElementById("expensesContainer");
            const newExpenseItem = document.createElement("div");
            newExpenseItem.classList.add("expense-item");

            newExpenseItem.innerHTML = `
                <input type="number" placeholder="Amount (₱)" class="expense-amount"/>
                <input type="text" placeholder="Description" class="expense-description"/>
            `;

            expensesContainer.appendChild(newExpenseItem);
        });

        // Generating the report
        document.getElementById("generateReportButton").addEventListener("click", function() {
            const soapIncome = parseFloat(document.getElementById("soapIncome").value) || 0;
            const waterIncome = parseFloat(document.getElementById("waterIncome").value) || 0;
            const totalIncome = soapIncome + waterIncome;
        
            const expenseItems = document.querySelectorAll(".expense-item");
            let totalExpenses = 0;
            let expensesList = "";
        
            expenseItems.forEach(item => {
                const amount = parseFloat(item.querySelector(".expense-amount").value) || 0;
                const description = item.querySelector(".expense-description").value.trim();
                totalExpenses += amount;
        
                if (amount > 0 && description) {
                    expensesList += `– ₱${amount} (${description})<br>`;
                }
            });
        
            const newTotal = totalIncome - totalExpenses;
        
            // Getting the current date
            const currentDate = new Date();
            const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
        
            // Conditionally generate report output
            let reportOutput = `
                <h3 class="report-date">${formattedDate}</h3>
                <h4 class="income-title">Income:</h4>
                <div class="income-item">Water - ₱${waterIncome.toLocaleString()}</div>
                <div class="income-item">Soap - ₱${soapIncome.toLocaleString()}</div>
                <div class="divider">-----------------------------------</div>
                <div class="total-income">Total Income - ₱${totalIncome.toLocaleString()}</div>
            `;
        
            if (totalExpenses > 0) {
                reportOutput += `
                    <h4 class="expenses-title">Expenses:</h4>
                    <div class="expenses-list">${expensesList}</div>
                    <div class="divider">-----------------------------------</div>
                    <div class="total-expenses">Total Expenses = ₱${totalExpenses.toLocaleString()}</div>
                    <div class="divider">-----------------------------------</div>
                    <div class="calculation">
                        ₱${totalIncome.toLocaleString()} (Total Income) - ₱${totalExpenses.toLocaleString()} (Total Expenses)
                    </div>
                    <h3 class="new-total">= ₱${newTotal.toLocaleString()} (NEW TOTAL)</h3>
                `;
            }
        
            document.getElementById("reportOutput").innerHTML = reportOutput;
        });