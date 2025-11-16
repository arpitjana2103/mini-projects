const fs = require("fs");
const filePath = `${__dirname}/../database.json`;

const data = fs.readFileSync(filePath, "utf-8");
const dataObj = JSON.parse(data);

const add = function (path, key, data) {
    dataObj[path][key] = data;
    fs.writeFileSync(filePath, JSON.stringify(dataObj));
};

const remove = function (path, key) {
    delete dataObj[path][key];
    fs.writeFileSync(filePath, JSON.stringify(dataObj));
};

const clear = function () {
    fs.writeFileSync(
        filePath,
        JSON.stringify({ members: {}, books: {}, issues: {} })
    );
};

module.exports = { add, remove, clear };
