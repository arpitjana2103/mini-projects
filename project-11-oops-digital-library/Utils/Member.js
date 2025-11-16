const Database = require("./Database.js");
const Issue = require("./Issue.js");

class Member {
    constructor(name, address, phone) {
        this.id = Member.#createId(name, phone);
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.issus = [];
        Member.#save(this);
    }

    issueBook(book) {
        if (book.issue_id) {
            console.log(
                `Sorry "${this.name}", This Book Alreay been issued, please try later`
            );
            return;
        }

        if (this.issus.length === 2) {
            console.log(`Sorry "${this.name}", We already issue you 2 books.`);
            return;
        }
        // 1. Create New Issue
        const issue = new Issue(this.id, book.isbn);
        // 2. Book --> issueBook
        book.issueBook(issue.id);
        // 3. Store issue id in the member
        this.issus.push(issue.id);

        console.log(
            `Congratulation "${this.name}", we issue you the book with ISBN : ${book.isbn}`
        );
        Member.#save(this);
    }

    returnBook(book) {
        // 1. Delete Issue
        Issue.remove(book.issue_id);

        // 3. Remove Issue Id from member
        this.issus = this.issus.filter(
            (issue_id) => issue_id !== book.issue_id
        );
        // 2. Book --> unissueBook
        book.unIssueBook();
        console.log(`${this.name} returnd ${book.isbn}`);
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

module.exports = Member;
