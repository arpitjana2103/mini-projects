// 1. Get A country data ( India )
// 2. Get Neighbour Country data ( Pakistan )
// 3. Get Neighbour Country data ( Afganisthan )

const baseURL = `https://restcountries.com/v3.1`;

function pritCountry(data) {
  const name = data.name.common;
  const capital = data.capital;
  console.log({ name: name, capital: capital });
}

function getCountryDataByAJAX(countryName) {
  // 1. AJAX 01
  const url = `${baseURL}/name/${countryName}`;
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();

  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText).at(1);
    pritCountry(data);

    const code = data.borders.at(0);

    // 2. AJAX 02
    const url = `${baseURL}/alpha/${code}`;
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();

    request.addEventListener("load", function () {
      const data = JSON.parse(this.responseText).at(0);
      pritCountry(data);
      const code = data.borders.at(0);

      // 3. AJAX 03
      const url = `${baseURL}/alpha/${code}`;
      const request = new XMLHttpRequest();
      request.open("GET", url);
      request.send();

      request.addEventListener("load", function () {
        const data = JSON.parse(this.responseText).at(0);
        pritCountry(data);
      });
    });
  });
}

// getCountryDataByAJAX("india");

function getCountryDataByFetch(countryName) {
  const url = `${baseURL}/name/${countryName}`;

  fetch(url, { method: "GET" }) // promise
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      const data = result.at(1);
      pritCountry(data);

      const code = data.borders.at(0);
      const url = `${baseURL}/alpha/${code}`;
      return fetch(url, { method: "GET" });
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      const data = result.at(0);
      pritCountry(data);

      const code = data.borders.at(0);
      const url = `${baseURL}/alpha/${code}`;
      return fetch(url, { method: "GET" });
    })
    .catch(function (err) {
      console.log(err);
    });
}

// getCountryDataByFetch("india");

// Async Await give you the way to write asnyc code in sync style code;
async function getCountryDataByAsyncAwait(countryName) {
  try {
    // Code
    let url = `${baseURL}/name/${countryName}`;
    let responce = await fetch(url, { method: "GET" });
    let result = await responce.json();

    let data = result.at(1);
    pritCountry(data);
    let code = data.borders.at(0);
    url = `${baseURL}/alpha/${code}`;

    responce = await fetch(url, { method: "GET" });
    result = await responce.json();

    data = result.at(0);
    pritCountry(data);
  } catch (error) {
    console.log(error);
  }
}

// getCountryDataByAsyncAwait("india");
