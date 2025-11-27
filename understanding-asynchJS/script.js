const baseURL = `https://restcountries.com/v3.1`;

const renderCountry = function (data, neighbour) {
  const flagPng = data.flags.png;
  const countryName = data.name.common;
  const region = data.region;
  const population = (+data.population / 1_000_000).toFixed(1);
  const languages = Object.values(data.languages).slice(0, 2).join(", ");
  const currency = Object.values(data.currencies)[0].name;

  console.log({
    flagPng,
    countryName,
    region,
    population,
    languages,
    currency,
  });
};

///////////////////////////////////////////////////////////////////////////
// PART 01 -- [ AJAX CALL ] ///////////////////////////////////////////////
/*
const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open("GET", `${baseURL}/name/${country}`);
    request.send();

    request.addEventListener("load", function () {
        const [data] = JSON.parse(this.responseText);
        const flagPng = data.flags.png;
        const countryName = data.name.common;
        const region = data.region;
        const population = (+data.population / 1_000_000).toFixed(1);
        const languages = Object.values(data.languages).slice(0, 2).join(", ");
        const currency = Object.values(data.currencies)[0].name;

          console.log({
                flagPng,
                countryName,
                region,
                population,
                languages,
                currency,
            });
        
    });
};

getCountryData("india");
getCountryData("portugal");
*/

///////////////////////////////////////////////////////////////////////////
// PART 02 -- [ CALL-BACK HELL ] //////////////////////////////////////////

/*
const getCountryDataAndNeighbour = function (country) {
    // AJAX CALL 01
    const request = new XMLHttpRequest();
    request.open("GET", `${baseURL}/name/${country}`);
    request.send();

    request.addEventListener("load", function () {
        const [data] = JSON.parse(this.responseText);

        // Render Country 01
        renderCountry(data);

        const neighbour = data.borders?.[0];
        if (!neighbour) return;

        // AJAX CALL 02
        const request = new XMLHttpRequest();
        request.open("GET", `${baseURL}/alpha/${neighbour}`);
        request.send();

        request.addEventListener("load", function () {
            const [data] = JSON.parse(this.responseText);

            // Render Country 02
            renderCountry(data);
            const neighbour = data.borders?.[0];
            if (!neighbour) return;

            // AJAX CALL 03
            const request = new XMLHttpRequest();
            request.open("GET", `${baseURL}/alpha/${neighbour}`);
            request.send();

            request.addEventListener("load", function () {
                const [data] = JSON.parse(this.responseText);

                // Render Country 03
                renderCountry(data);
            });
        });
    });
};

getCountryDataAndNeighbour("india");
*/

///////////////////////////////////////////////////////////////////////////
// PART 02 -- [ FETCH & PROMISES ] ////////////////////////////////////////

const getJSON = function (url) {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`Country not found ${response.status}`);
    return response.json();
  });
};

const getCountryData = function (country) {
  fetch(`${baseURL}/name/${country}`)
    .then((response) => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      return fetch(`${baseURL}/alpha/${neighbour}`);
    })
    .then((response) => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0], "neighbour");
    })
    .catch(function (err) {
      console.log(`${err} ⛔`);
    });
};

// With Async-Await

const getCountryData2 = async function (countryName) {
  let response = await fetch(`${baseURL}/name/${countryName}`);
  let data = await response.json();
  let countryData = data[0];

  renderCountry(countryData);
  const neighbour = countryData.borders?.[0];

  response = await fetch(`${baseURL}/alpha/${neighbour}`);
  data = await response.json();
  countryData = data[0];
  renderCountry(countryData, "neighbour");
};
