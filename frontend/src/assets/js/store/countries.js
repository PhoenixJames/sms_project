import countries from '../constants/countries';

const kCountryToCurrency = {
  mm: 'MMK',
  hk: 'HKD',
  vn: 'VND',
};

const CountriesModule = {
  getters: {
    countries: () => countries,
    getCountryCurrency: () => country => kCountryToCurrency[String(country).toLocaleLowerCase()] || 'USD',
  },
};

export default CountriesModule;
