const fs = require("fs");

const dataStr = fs.readFileSync("data.json", "utf-8");
const data = JSON.parse(dataStr);

const appendText = function (text) {
  fs.appendFileSync("output.txt", text, "utf-8");
};

const employeeCount = data.length;

let totalSalary = 0;
const highestSalary = { name: null, salary: 0 };
const departmentsWiseInfo = {};
/*
departmentsWiseInfo = {
  Engineering: { count: 2, totalSalary: 165000 },
  Marketing: { count: 1, totalSalary: 55000 },
  HR: { count: 1, totalSalary: 45000 }
}
*/

data.forEach(function (emp) {
  const { name, salary, department } = emp;
  totalSalary += salary;

  if (salary > highestSalary.salary) {
    highestSalary.name = name;
    highestSalary.salary = salary;
  }

  if (departmentsWiseInfo[department] === undefined) {
    departmentsWiseInfo[department] = { count: 0, totalSalary: 0 };
  }
  departmentsWiseInfo[department].count += 1;
  departmentsWiseInfo[department].totalSalary += salary;
});

const avgSalary = totalSalary / employeeCount;

const appendDepartSummery = function (departmentsWiseInfo) {
  /*
    departmentsWiseInfo = {
        Engineering: { count: 2, totalSalary: 165000 },
        Marketing: { count: 1, totalSalary: 55000 },
        HR: { count: 1, totalSalary: 45000 }
    }
*/
  for (let department in departmentsWiseInfo) {
    const info = departmentsWiseInfo[department];
    const { count, totalSalary } = info;
    const avgSalary = totalSalary / count;
    appendText(
      `- ${department}: ${count} employees, Avg Salary ₹${avgSalary.toLocaleString()}\n`
    );
  }
};

const appendEmployeesByExp = function (data) {
  const sortedData = data.toSorted(function (a, b) {
    return b.experience - a.experience;
  });

  appendText(`\nSorted by Experience (High to Low):\n`);
  sortedData.forEach(function (emp, i) {
    const { name, experience } = emp;
    appendText(`${i + 1}. ${name} (${experience} years)\n`);
  });
};

appendText(`
Total Employees: ${employeeCount}
Average Salary: ₹${avgSalary.toLocaleString()}
Highest Paid Employee: ${
  highestSalary.name
} (₹${highestSalary.salary.toLocaleString()})

Department Summary:
`);
appendDepartSummery(departmentsWiseInfo);
appendEmployeesByExp(data);
