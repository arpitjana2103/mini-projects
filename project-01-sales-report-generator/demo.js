const arr = [2, 0, 5, 1, 6, 3];

arr.sort(function (a, b) {
  // What you want
  if (a > b) return -1;
  // What you don't want
  if (b < a) return 1;
  // You dont care
  if (a === b) return 0;
});

function printHighest(count) {
  const start = 0;
  const end = count - 1;

  for (let i = start; i <= end; i++) {
    console.log(arr.at(i));
  }
}

printHighest(3);
