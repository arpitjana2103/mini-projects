const Database = require("./Database");
const helper = require("./helper");

class Issue {
    constructor(member_id, isbn) {
        this.id = `Issue-${isbn}`;
        this.isbn = isbn;
        this.member_id = member_id;
        this.iat = new Date().toDateString();
        Issue.#save(this);
    }

    static remove(issue_id) {
        Database.remove("issues", issue_id);
    }

    static #save(issue) {
        Database.add("issues", issue.id, issue);
    }
}

module.exports = Issue;
