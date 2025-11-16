const Database = require("./Database");

class Book {
    constructor(isbn, name, auther) {
        this.isbn = isbn;
        this.name = name;
        this.auther = auther;
        this.issue_id = "";
        Book.#save(this);
    }

    issueBook(issue_id) {
        this.issue_id = issue_id;
        Book.#save(this);
    }

    unIssueBook() {
        this.issue_id = "";
        Book.#save(this);
    }

    static #save(book) {
        Database.add("books", book.isbn, book);
    }
}

module.exports = Book;
