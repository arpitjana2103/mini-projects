const fs = require("fs");

const data = fs.readFileSync("./data.json", "utf-8");
const fData = JSON.parse(data);

const calcGrade = function (persentage) {
  let grade = null;

  if (persentage > 75) grade = "A";
  else if (persentage <= 75 && persentage > 55) grade = "B";
  else if (persentage <= 55 && persentage > 30) grade = "C";
  else if (persentage <= 30) grade = "D";

  return grade;
};

const getStudentReport = function (stuObj) {
  const { id, name, marks, attendance } = stuObj;
  const totalMarks = Object.values(marks).reduce((acc, ele) => acc + ele, 0);
  const persentage = (totalMarks / (Object.keys(marks).length * 100)) * 100;

  totalPersentage += persentage;
  if (persentage > topPerformer.persentage) {
    topPerformer.name = name;
    topPerformer.persentage = persentage;
  }
  if (persentage < 70) below70Students.push(name);
  if (attendance < 75) below75Attendense.push(name);

  const grade = calcGrade(persentage);
  return `${id}. ${name} - Total: ${totalMarks} | Percentage: ${persentage.toFixed(
    2
  )}% | Grade: ${grade}`;
};

let totalPersentage = 0;
const topPerformer = { name: "", persentage: 0 };
const studentCount = fData.length;
const below70Students = [];
const below75Attendense = [];

let performanceStr = fData.reduce(function (acc, stu) {
  return acc + getStudentReport(stu) + "\n";
}, "");

const avgPersentage = totalPersentage / studentCount;

const resultStr = `
--------------------------------------------
           CLASS REPORT - AUG 2025
--------------------------------------------

Individual Performance:
${performanceStr}

--------------------------------------------
Class Summary:
- Class Average Percentage: ${avgPersentage.toFixed(2)}%
- Top Performer: ${topPerformer.name} (${topPerformer.persentage.toFixed(2)}%)
- Students Below 70%: ${below70Students.join(", ")}
- Students with Low Attendance (<75%): ${below75Attendense.join(", ")}
--------------------------------------------
`;

fs.writeFileSync("output.txt", resultStr, "utf-8");
