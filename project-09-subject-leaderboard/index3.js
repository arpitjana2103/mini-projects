class Student {
  constructor(fName, lName, DOB) {
    this.fName = fName;
    this.lName = lName;
    this.DOB = DOB;
  }

  calcAge() {
    return new Date() - new Date(this.DOB);
  }

  static displaySchoolName() {
    console.log("School Name");
  }
}

const stu1 = new Student("Arjune", "Bose", "12-12-2000");
const stu2 = new Student("Vinod", "Limbodiya", "10-08-1999");

Student.displaySchoolName();
