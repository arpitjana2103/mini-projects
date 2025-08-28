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

function getTop(products, count) {
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

const result = `
----------------------------------------
         SALES REPORT - AUG 2025
----------------------------------------
Total Revenue: ₹${totalRevenue}
Total Units Sold: ${totalUnins}

Best-Selling Product: ${maxQuantitySoldProductName} (${maxQuantitySold} units)
Highest Revenue Product: ${highestRevenueProductName} (₹${highestRevenue})

Category-Wise Revenue:
${objToStr(categoryWiseRev)}

Top 4 Products by Revenue :
${getTop(products, 4)}
----------------------------------------`;

fs.writeFileSync("output.txt", result, "utf8");
console.log("output.txt created.");
