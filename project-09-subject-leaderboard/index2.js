const Student = function (fName, lName, DOB) {
  // 1. {}
  // 2. this --> {}
  this.fName = fName;
  this.lName = lName;
  this.DOB = DOB;
  // 3. return this --> {fName: "", lName: "", DOB: ""}
};

Student.prototype.calcAge = function () {
  return new Date() - new Date(this.DOB);
};

Student.displaySchoolName = function () {
  console.log("School Name");
};

const stu1 = new Student("Arjune", "Bose", "12-12-2000");
const stu2 = new Student("Vinod", "Limbodiya", "10-08-1999");

Student.displaySchoolName();

// stu1.__proto__ == Student.prototype;
// stu1.__proto__.constructor == Student;
