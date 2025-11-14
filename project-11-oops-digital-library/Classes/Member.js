const Database = require("./Database.js");

class Member {
    constructor(name, address, phone) {
        this.id = Member.#createId(name, phone);
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.issus = [];
        Member.#save(this);
    }

    static remove(member) {
        Database.remove("members", member.id);
    }

    static #save(member) {
        Database.add("members", member.id, member);
    }

    static #createId(name, phone) {
        return `${name.toLowerCase().slice(0, 4)}-${phone}`;
    }
}

// Create new Member
// const member = new Member("Mahesh", "MP", 456789999);

// Remove member
// Member.remove(member);

module.exports = Member;
