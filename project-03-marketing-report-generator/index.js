const fs = require("fs");

const data = fs.readFileSync("marketingData.json", "utf-8");
const fData = JSON.parse(data);

function appendText(text) {
  fs.appendFileSync("output.txt", text, "utf-8");
}

let totalSpend = 0;
let totalRevenue = 0;
let overallROI = 0;

const maxROI = { name: null, roi: Number.MIN_VALUE };
const minROI = { name: null, roi: Number.MAX_VALUE };

appendText(`Campaign Performance:`);

fData.forEach(function (camp) {
  const { id, campaignName, clicks, impressions, conversions, revenue, cost } =
    camp;

  const CTR = (clicks / impressions) * 100;
  const CR = (conversions / clicks) * 100;
  const ROI = ((revenue - cost) / cost) * 100;

  totalSpend += cost;
  totalRevenue += revenue;
  overallROI += ROI;

  if (ROI > maxROI.roi) {
    maxROI.name = campaignName;
    maxROI.roi = ROI;
  }

  if (ROI < minROI.roi) {
    minROI.name = campaignName;
    minROI.roi = ROI;
  }

  appendText(`
    ${id}. ${campaignName}
        - CTR: ${CTR.toFixed(2)}%
        - Conversion Rate: ${CR.toFixed(2)}%
        - ROI: ${ROI.toFixed(2)}%
        - Revenue: ₹${revenue.toLocaleString()} | Cost: ₹${cost.toLocaleString()}
    `);
});

appendText(`
Overall Summary:
- Total Spend: ₹${totalSpend.toLocaleString()}
- Total Revenue: ₹${totalRevenue.toLocaleString()}
- Overall ROI: ${overallROI.toLocaleString()}%
- Best Performing Campaign: ${maxROI.name}
- Campaign Needing Optimization: ${minROI.name}    
`);
