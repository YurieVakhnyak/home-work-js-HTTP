import { forEach } from "lodash";
import Notiflix from "notiflix";
import "./css/styles.css";
const _ = require("lodash");

const DEBOUNCE_DELAY = 300;

const fetchCountryBtn = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

fetchCountryBtn.addEventListener("input", () => {
  if (fetchCountryBtn.value === "") {
    Notiflix.Notify.success("Let start again!");
  } else {
    debouncedFetchCountries();
  }
});

var debouncedFetchCountries = _.debounce(function () {
  fetchCountries()
    .then((countries) => renderCountryList(countries))
    .catch((error) => console.log(error));
}, DEBOUNCE_DELAY);

function fetchCountries(country) {
  country = fetchCountryBtn.value.trim();
  return fetch(`https://restcountries.com/v3.1/name/${country}`).then(
    (response) => {
      if (!response.ok) {
        Notiflix.Notify.failure("Please, try another way");
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function renderCountryList(countries) {
  if (countries.length === 1) {
    countryInfo.style.display = "block";
    countryList.style.display = "none";
    const markup = countries
      .map((country) => {
        return `
           <p><img src="${country.flags.svg}" width="30"/>
            ${country.name.common}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
          <p><b>Languages</b>: ${Object.values(country.languages)}</p>
        
        `;
      })
      .join("");
    countryInfo.innerHTML = markup;
  } else if (countries.length > 10) {
    Notiflix.Notify.info(
      "Too many matches found. Please enter a more specific name."
    );
  } else if (countries.length < 10) {
    countryInfo.style.display = "none";
    countryList.style.display = "block";
    const markup = countries
      .map((country) => {
        return `<li>
           <p><img src="${country.flags.svg}" width="30"/>
            ${country.name.common}</p>
        </li>`;
      })
      .join("");
    countryList.innerHTML = markup;
  }
}
