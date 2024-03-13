interface City {
    cityName: string;
    country: string;
    population: number;
  }
  
  const cityForm = document.getElementById('cityForm') as HTMLFormElement;
  const cityNameInput = document.getElementById('cityName') as HTMLInputElement;
  const countryInput = document.getElementById('country') as HTMLInputElement;
  const populationInput = document.getElementById('population') as HTMLInputElement;
  const searchInput = document.getElementById('searchInput') as HTMLInputElement;
  const cityList = document.getElementById('cityList') as HTMLUListElement;
  
  let cities: City[] = [];
  
  function renderCities(cityArray: City[]) {
    cityList.innerHTML = '';
    cityArray.forEach(city => {
      const li = document.createElement('li');
      li.textContent = `${city.cityName}, ${city.country}, Population: ${city.population}`;
      cityList.appendChild(li);
    });
  }
  
  function addCity(event: Event) {
    event.preventDefault();
    const cityName = cityNameInput.value.trim();
    const country = countryInput.value.trim();
    const population = parseInt(populationInput.value);
  
    if (cityName && country && !isNaN(population)) {
      const newCity: City = { cityName, country, population };
      cities.push(newCity);
      localStorage.setItem('cities', JSON.stringify(cities));
      renderCities(cities);
      cityNameInput.value = '';
      countryInput.value = '';
      populationInput.value = '';
    } else {
      alert('Please fill in all fields correctly.');
    }
  }
  
  function filterCities(searchTerm: string) {
    const filteredCities = cities.filter(city => {
      return city.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             city.country.toLowerCase().includes(searchTerm.toLowerCase());
    });
    renderCities(filteredCities);
  }
  
  cityForm.addEventListener('submit', addCity);
  searchInput.addEventListener('input', () => filterCities(searchInput.value));
  
  document.addEventListener('DOMContentLoaded', () => {
    const storedCities = localStorage.getItem('cities');
    if (storedCities) {
      cities = JSON.parse(storedCities);
      renderCities(cities);
    }
  });
  
  export const addCityToList = (city: City) => {
    cities.push(city);
    localStorage.setItem('cities', JSON.stringify(cities));
    renderCities(cities);
  };
  
  export const filterCityList = (searchTerm: string) => {
    filterCities(searchTerm);
  };

  export const isValidISBN10 = (isbn: string): boolean => {
    isbn = isbn.replace(/ /g, '').toUpperCase().replace('X', '10');
    if (isbn.length !== 10) return false;
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      const char = isbn.charAt(i);
      if (i < 9 && isNaN(parseInt(char))) return false;
      if (i === 9 && (isNaN(parseInt(char)) && char !== 'X')) return false;
      const value = char === 'X' ? 10 : parseInt(char);
      sum += value * (i + 1);
    }
    return sum % 11 === 0;
  };


  export const transformString = (input: string): string => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const vowels = 'aeiou';
    let transformedString = '';
  
    for (let i = 0; i < input.length; i++) {
      let char = input[i].toLowerCase();
  
      if (char >= 'a' && char <= 'z') {
        let newIndex = (alphabet.indexOf(char) + 1) % 26;
        char = alphabet[newIndex];

        if (vowels.includes(char)) {
          char = char.toUpperCase();
        }
      }
  
      transformedString += char;
    }
  
    return transformedString;
  };

  const transformAndDisplay = () => {
    const inputString = (document.getElementById('inputString') as HTMLInputElement).value;
    const transformedString = transformString(inputString);
    const outputElement = document.getElementById('output');
    if (outputElement) {
        outputElement.innerText = transformedString;
    } else {
        console.error("Output element not found.");
    }
};

export const moveZeros = (arr: any[]): any[] => {
    const zeros: any[] = [];
    const nonZeros: any[] = [];

    arr.forEach(element => {
        if (element === 0) {
            zeros.push(element);
        } else {
            nonZeros.push(element);
        }
    });

    return [...nonZeros, ...zeros];
};

console.log(moveZeros([false, 1, 0, 1, 2, 0, 1, 3, "a"]));


  