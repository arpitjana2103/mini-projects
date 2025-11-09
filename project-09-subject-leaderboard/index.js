const data = [
  {
    id: 1,
    name: "Aarav Sharma",
    scores: {
      Math: [78, 85, 92],
      Science: [88, 90, 94],
      English: [70, 75, 80],
    },
  },
  {
    id: 2,
    name: "Sneha Patel",
    scores: {
      Math: [45, 60, 56],
      Science: [82, 85, 87],
      English: [88, 86, 90],
      Bio: [45, 99, 65],
    },
  },
  {
    id: 3,
    name: "Rohan Mehta",
    scores: {
      Math: [60, 65, 70],
      Science: [68, 70, 72],
      English: [55, 60, 65],
      Bio: [88, 99, 78],
    },
  },
];

data.forEach(function ({ name, scores, id }) {
  const marksArr = Object.values(scores).flat();
  const avgMarks =
    marksArr.reduce((acc, ele) => acc + ele, 0) / marksArr.length;
  console.log(`${id}. ${name} - Avg: ${avgMarks.toFixed(2)}%`);
});

const subjects = new Map();

data.forEach(function ({ name, scores }) {
  for (const sub in scores) {
    const marksArr = scores[sub];
    const hMarks = marksArr.reduce(
      (acc, marks) => (marks > acc ? marks : acc),
      0
    );
    const totalMarks = marksArr.reduce((acc, marks) => acc + marks, 0);
    if (!subjects.has(sub)) {
      subjects.set(sub, {
        tName: "",
        tMarks: 0,
        total: 0,
        count: 0,
      });
    }

    if (subjects.get(sub).tMarks < hMarks) {
      subjects.get(sub).tMarks = hMarks;
      subjects.get(sub).tName = name;
    }

    subjects.get(sub).total += totalMarks;
    subjects.get(sub).count += marksArr.length;
  }
});

subjects.forEach(function ({ tName, tMarks, total, count }, sub) {
  console.log(
    `- ${sub}: Topper ${tName} (${tMarks}), Average: ${(total / count).toFixed(
      2
    )}`
  );
});
