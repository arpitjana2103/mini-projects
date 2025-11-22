const Database = require("./Utils/Database");
const User = require("./Utils/User");

Database.clear();
const u1_admin = new User(
    "Arjun Shah",
    "9876543210",
    "123412341234",
    "ABCDE1234F",
    "Mumbai, MH",
    "<admin_pass_key>"
);
const u2 = new User(
    "Priya Verma",
    "9123456780",
    "234523452345",
    "PQRSX6789A",
    "Delhi, DL"
);

const u2_acc = u2.createAccount();

u2_acc.deposite(20_000, "salary");
u2_acc.withdraw(500, "grossery");
u2_acc.deposite(20_000, "salary");
u2_acc.withdraw(145, "grossery");
u2_acc.deposite(19_000, "salary");
u2_acc.withdraw(10_000, "funiture");
u2_acc.withdraw(299, "mobile_recharge");
u2_acc.deposite(20_000, "salary");
u2_acc.deposite(19_000, "salary");
u2_acc.deposite(18_000, "salary");
u2_acc.applyLoan(10_000);
u2_acc.withdraw(500, "grossery");
u2_acc.withdraw(10_000, "funiture");

u2_acc.showTrans();

// 1. Apply Loan : 10,000
// 2. last 100 desposite-transaction total deposite amount 2x of loan amount.
