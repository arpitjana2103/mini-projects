const { db_add } = require("./Database");

class BankAcc {
    #balance_amt;
    #pin;
    #loan_amt;
    #transactions;

    constructor(user_id, user_phone) {
        this.account_num = user_phone;
        this.user_id = user_id;
        this.#balance_amt = 0;
        this.#pin = null;
        this.#loan_amt = 0;
        this.#transactions = [];
        BankAcc.#save(this);
        console.log("#### A Account created");
        console.log(this);
    }

    get account_blance() {
        return this.#balance_amt;
    }

    set pin(value) {
        if (typeof value === "number") {
            if (value >= 1000 && value <= 9999) {
                this.#pin = value;
                BankAcc.#save(this);
            }
        }
    }

    get pin() {
        return this.#pin;
    }

    deposite(amt, message) {
        if (amt < 100) {
            console.log("Minimum deposite amount be 100Rs.");
            return;
        }
        this.#balance_amt += amt;
        this.#updateTrans("deposite", amt, message);
        BankAcc.#save(this);
    }

    withdraw(amt, message) {
        if (amt < this.#balance_amt) {
            this.#balance_amt -= amt;
            this.#updateTrans("withdraw", amt, message);
            BankAcc.#save(this);
        }
    }

    showTrans() {
        console.table(this.#transactions);
    }

    applyLoan(amt) {
        if (this.approveLoan(amt)) {
            this.deposite(amt, "loan-amount");
            this.#loan_amt = amt;
            console.log(`Your Loan of ${amt} has been approved`);
        } else {
            console.log("Loan can't be approved");
        }
    }

    approveLoan(loan_amt) {
        if (this.#loan_amt) return;
        let totalDepositeAmt = 0;
        let count = 0;

        this.#transactions.forEach(function (trans) {
            if (count < 100 && trans.type === "deposite") {
                totalDepositeAmt += trans.amount;
                count++;
            }
        });

        console.log(totalDepositeAmt, loan_amt);

        return totalDepositeAmt >= 2 * loan_amt;
    }

    #updateTrans(type, amount, message) {
        if (type === "withdraw") amount *= -1;
        this.#transactions.unshift({
            type: type,
            amount: amount,
            time: new Date().toDateString(),
            message,
        });
    }

    static #save(acc) {
        db_add("accounts", acc.account_num, acc);
    }
}

module.exports = BankAcc;
