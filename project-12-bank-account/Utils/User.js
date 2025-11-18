const BankAcc = require("./BankAcc");
const { db_add } = require("./Database");

class User {
    constructor(name, phone, aadhar_no, pan_no, address, pass_key) {
        this.id = pan_no;
        this.name = name;
        this.phone = phone;
        this.aadhar_no = aadhar_no;
        this.address = address;
        this.pan_no = pan_no;
        if (pass_key === "<admin_pass_key>") this.type = "admin";
        else this.type = "acc_holder";
        User.#save(this);
        console.log("#### A new user created.");
        console.log(this);
    }

    createAccount() {
        return new BankAcc(this.id, this.phone);
    }

    static #save(user) {
        db_add("users", user.id, user);
    }
}

module.exports = User;
