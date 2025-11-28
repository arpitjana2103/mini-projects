// JS is Single Threaded Programming Language.
// Long Running Tasks :
// 1. Complex Calculation ( take long time )
// 2. REST API call       ( take long time )

// Asynchronous JS
// Asynchronous API
// 1. Rest API Call ( XMLHttpRequest -> Fetch + Promise -> AsyncAwait + Promise )
// 2. EvenListeners
// 3. SetTimeOut & SetInterval

const getRandomNumber = function (min, max) {
  const range = max - min;
  const value = Math.round(Math.random() * range) + min;
  return value;
};

const promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    const number = getRandomNumber(1, 10);
    if (number < 5) resolve(`Success: number is ${number}`);
    else reject(`Fail: number is ${number}`);
  }, 3000);
});

console.log(promise);
promise
  .then(function (data) {
    console.log(promise);
    console.log(data);
  })
  .catch(function (err) {
    console.log(promise);
    console.log(err);
  });
