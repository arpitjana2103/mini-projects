const Book = require("./Utils/Book");
const Member = require("./Utils/Member");
const Database = require("./Utils/Database");

// CLear DataBase
Database.clear();

// Create 10 Books
const book1 = new Book("ISBN001", "ReactDad-PoorDad", "Arpit Jana");
const book2 = new Book("ISBN002", "JavaScript Essentials", "Kyle Simpson");
const book3 = new Book("ISBN003", "Clean Code", "Robert C. Martin");
const book4 = new Book("ISBN004", "You Don't Know JS", "Kyle Simpson");
const book5 = new Book("ISBN005", "Eloquent JavaScript", "Marijn Haverbeke");
const book6 = new Book("ISBN006", "Learning React", "Alex Banks");
const book7 = new Book("ISBN007", "Node.js in Action", "Mike Cantelon");
const book8 = new Book("ISBN008", "Design Patterns", "Erich Gamma");
const book9 = new Book("ISBN009", "System Design Basics", "Alex Xu");
const book10 = new Book("ISBN010", "The Pragmatic Programmer", "Andrew Hunt");

// Create 5 Members
const member1 = new Member("Ajay Sinha", "Patna, Bihar", "9876543210");
const member2 = new Member("Rohit Verma", "Kolkata, West Bengal", "9123456780");
const member3 = new Member("Sneha Kapoor", "Delhi", "9812345678");
const member4 = new Member("Meera Chawla", "Mumbai, Maharashtra", "9001234567");
const member5 = new Member("Vikram Patel", "Ahmedabad, Gujarat", "9797979797");

member1.issueBook(book10);
member1.issueBook(book2);

// member1.returnBook(book10);
member1.issueBook(book3);
