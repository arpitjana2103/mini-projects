// npm init -y

const fs = require("fs");

const data = fs.readFileSync("./salseData.json", "utf8");
const products = JSON.parse(data);

let totalRevenue = 0;
let totalUnins = 0;
let maxQuantitySold = 0;
let maxQuantitySoldProductName = null;
let highestRevenue = 0;
let highestRevenueProductName = null;

let categoryWiseRev = {};

function objToStr(obj) {
  let str = "";
  for (let key in obj) {
    const value = obj[key];
    str += `- ${key}: ₹${value}\n`;
  }
  return str;
}

products.forEach(function (product) {
  const { id, product: name, category, price, quantitySold, date } = product;
  const revenue = price * quantitySold;

  totalRevenue += revenue;
  totalUnins += quantitySold;

  if (quantitySold > maxQuantitySold) {
    maxQuantitySold = quantitySold;
    maxQuantitySoldProductName = name;
  }

  if (revenue > highestRevenue) {
    highestRevenue = revenue;
    highestRevenueProductName = name;
  }

  if (categoryWiseRev[category] === undefined) {
    categoryWiseRev[category] = 0;
  }
  categoryWiseRev[category] += revenue;
});

console.log(`Total Revenue: ₹${totalRevenue}
Total Units Sold: ${totalUnins}
Best-Selling Product: ${maxQuantitySoldProductName} (${maxQuantitySold} units)
Highest Revenue Product: ${highestRevenueProductName} (₹${highestRevenue})
Category-Wise Revenue:
${objToStr(categoryWiseRev)}`);

/*
// Total Revenue: ₹72,272
// Total Units Sold: 48

// Best-Selling Product: USB-C Cable (20 units)
// Highest Revenue Product: Mechanical Keyboard (₹17,495)

Category-Wise Revenue:
- Electronics: ₹39,483
- Furniture: ₹17,997
- Accessories: ₹14,792

Top 3 Products by Revenue:
1. Mechanical Keyboard - ₹17,495
2. Office Chair - ₹17,997
3. Wireless Mouse - ₹9,588
*/
