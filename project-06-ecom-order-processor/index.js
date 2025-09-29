const fs = require("fs");

const dataStr = fs.readFileSync("data.json", "utf-8");
const orders = JSON.parse(dataStr);
const revByCustomers = {};
const revByCategory = {};
const ourderCountByStatus = {};

let totalRevnue = 0;
const orderCount = orders.length;

const appendText = function (text) {
    fs.appendFileSync("output.txt", text, "utf-8");
};

const appendObj = function (obj, formatStr) {
    for (let key in obj) {
        let str = formatStr;
        str = str.replaceAll("#key", key);
        str = str.replaceAll("#value", obj[key]);
        appendText(str);
    }
};

const addValueToObj = function (obj, key, value) {
    if (obj[key] === undefined) obj[key] = 0;
    obj[key] += value;
};

orders.forEach(function (order) {
    const { customer, items, status } = order;
    addValueToObj(ourderCountByStatus, status, 1);
    let orderRevenue = 0;
    items.forEach(function (item) {
        const { price, quantity, category } = item;
        const itemRevnue = price * quantity;
        addValueToObj(revByCategory, category, itemRevnue);
        orderRevenue += itemRevnue;
        totalRevnue += itemRevnue;
    });
    addValueToObj(revByCustomers, customer, orderRevenue);
});

appendText(`
-----------------------------------------
         E-COMMERCE ORDER REPORT
-----------------------------------------
`);

appendText(`
Total Revenue: ₹${totalRevnue}
Total Orders: ${orderCount}
Unique Customers: ${Object.keys(revByCustomers).length}
`);

appendText(`\nRevenue by Customer:\n`);
appendObj(revByCustomers, `- #key: ₹#value\n`);
appendText(`\nRevenue by Category:\n`);
appendObj(revByCategory, `- #key: ₹#value\n`);
appendText(`\nOrders by Status:\n`);
appendObj(ourderCountByStatus, `- #key: #value\n`);
