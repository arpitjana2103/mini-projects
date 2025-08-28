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

function getTop3(products, count) {
  const start = 0;
  const end = count - 1;

  let str = "";

  for (let i = start; i <= end; i++) {
    const { product, revenue } = products.at(i);
    str += `${i + 1}. ${product} - ₹${revenue}\n`;
  }

  return str;
}

products.forEach(function (product) {
  const { id, product: name, category, price, quantitySold, date } = product;
  const revenue = price * quantitySold;
  product.revenue = revenue;

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

products.sort(function (a, b) {
  const revA = a.revenue;
  const revB = b.revenue;
  // What you want
  if (revA > revB) return -1;
  // What you don't want
  if (revA < revB) return 1;
  // You dont care
  if (revA === revB) return 0;
});

console.log(`
----------------------------------------
         SALES REPORT - AUG 2025
----------------------------------------
Total Revenue: ₹${totalRevenue}
Total Units Sold: ${totalUnins}

Best-Selling Product: ${maxQuantitySoldProductName} (${maxQuantitySold} units)
Highest Revenue Product: ${highestRevenueProductName} (₹${highestRevenue})

Category-Wise Revenue:
${objToStr(categoryWiseRev)}

Top 4 Products by Revenue:
${getTop3(products, 4)}
----------------------------------------`);

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
