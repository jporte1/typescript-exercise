"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveZeros = exports.transformString = exports.isValidISBN10 = exports.filterCityList = exports.addCityToList = void 0;
const cityForm = document.getElementById('cityForm');
const cityNameInput = document.getElementById('cityName');
const countryInput = document.getElementById('country');
const populationInput = document.getElementById('population');
const searchInput = document.getElementById('searchInput');
const cityList = document.getElementById('cityList');
let cities = [];
function renderCities(cityArray) {
    cityList.innerHTML = '';
    cityArray.forEach(city => {
        const li = document.createElement('li');
        li.textContent = `${city.cityName}, ${city.country}, Population: ${city.population}`;
        cityList.appendChild(li);
    });
}
function addCity(event) {
    event.preventDefault();
    const cityName = cityNameInput.value.trim();
    const country = countryInput.value.trim();
    const population = parseInt(populationInput.value);
    if (cityName && country && !isNaN(population)) {
        const newCity = { cityName, country, population };
        cities.push(newCity);
        localStorage.setItem('cities', JSON.stringify(cities));
        renderCities(cities);
        cityNameInput.value = '';
        countryInput.value = '';
        populationInput.value = '';
    }
    else {
        alert('Please fill in all fields correctly.');
    }
}
function filterCities(searchTerm) {
    const filteredCities = cities.filter(city => {
        return city.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            city.country.toLowerCase().includes(searchTerm.toLowerCase());
    });
    renderCities(filteredCities);
}
cityForm.addEventListener('submit', addCity);
searchInput.addEventListener('input', () => filterCities(searchInput.value));
// Load cities from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedCities = localStorage.getItem('cities');
    if (storedCities) {
        cities = JSON.parse(storedCities);
        renderCities(cities);
    }
});
const addCityToList = (city) => {
    cities.push(city);
    localStorage.setItem('cities', JSON.stringify(cities));
    renderCities(cities);
};
exports.addCityToList = addCityToList;
const filterCityList = (searchTerm) => {
    filterCities(searchTerm);
};
exports.filterCityList = filterCityList;
const isValidISBN10 = (isbn) => {
    isbn = isbn.replace(/ /g, '').toUpperCase().replace('X', '10');
    if (isbn.length !== 10)
        return false;
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        const char = isbn.charAt(i);
        if (i < 9 && isNaN(parseInt(char)))
            return false;
        if (i === 9 && (isNaN(parseInt(char)) && char !== 'X'))
            return false;
        const value = char === 'X' ? 10 : parseInt(char);
        sum += value * (i + 1);
    }
    return sum % 11 === 0;
};
exports.isValidISBN10 = isValidISBN10;
const transformString = (input) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const vowels = 'aeiou';
    let transformedString = '';
    for (let i = 0; i < input.length; i++) {
        let char = input[i].toLowerCase();
        if (char >= 'a' && char <= 'z') {
            // Replace with the next letter in the alphabet
            let newIndex = (alphabet.indexOf(char) + 1) % 26;
            char = alphabet[newIndex];
            // Make vowels capital
            if (vowels.includes(char)) {
                char = char.toUpperCase();
            }
        }
        transformedString += char;
    }
    return transformedString;
};
exports.transformString = transformString;
const transformAndDisplay = () => {
    const inputString = document.getElementById('inputString').value;
    const transformedString = (0, exports.transformString)(inputString);
    const outputElement = document.getElementById('output');
    if (outputElement) {
        outputElement.innerText = transformedString;
    }
    else {
        console.error("Output element not found.");
    }
};
const moveZeros = (arr) => {
    const zeros = [];
    const nonZeros = [];
    arr.forEach(element => {
        if (element === 0) {
            zeros.push(element);
        }
        else {
            nonZeros.push(element);
        }
    });
    return [...nonZeros, ...zeros];
};
exports.moveZeros = moveZeros;
// Test the function
console.log((0, exports.moveZeros)([false, 1, 0, 1, 2, 0, 1, 3, "a"]));
