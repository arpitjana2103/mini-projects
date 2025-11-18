const fs = require("fs");
const filePath = `${__dirname}/../database.json`;

const data = fs.readFileSync(filePath, "utf-8");
const dataObj = JSON.parse(data);

const db_add = function (collection, key, data) {
    dataObj[collection][key] = data;
    fs.writeFileSync(filePath, JSON.stringify(dataObj));
};

const remove = function (collection, key) {
    delete dataObj[collection][key];
    fs.writeFileSync(filePath, JSON.stringify(dataObj));
};

const clear = function () {
    fs.writeFileSync(filePath, JSON.stringify({ users: {}, accounts: {} }));
};

module.exports = { db_add, remove, clear };
