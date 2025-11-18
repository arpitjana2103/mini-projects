const { db_add } = require("./Database");

class BankAcc {
    constructor(user_id, user_phone) {
        this.account_num = user_phone;
        this.user_id = user_id;
        this.balance_amt = 0;
        this.loan_amt = 0;
        this.pin = null;
        BankAcc.#save(this);
        console.log("#### A Account created");
        console.log(this);
    }

    deposite(amt) {
        if (amt < 100) {
            console.log("Minimum deposite amount be 100Rs.");
            return;
        }
        this.balance_amt += amt;
        BankAcc.#save(this);
    }

    withdraw(amt) {
        if (amt < this.balance_amt) {
            this.balance_amt -= amt;
            BankAcc.#save(this);
        }
    }

    static #save(acc) {
        db_add("accounts", acc.account_num, acc);
    }
}

module.exports = BankAcc;
