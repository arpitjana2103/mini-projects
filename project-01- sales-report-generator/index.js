const fs = require("fs");

const data = fs.readFileSync("./salseData.json", "utf8");
const fData = JSON.parse(data);

console.log(fData.at(0));
