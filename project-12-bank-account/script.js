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

u2_acc.deposite(500);
u2_acc.withdraw(200);
