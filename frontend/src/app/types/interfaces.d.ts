interface Country {
  name: string;
  countryCode: string;
}

interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: BorderCountry[];
  flag: string;
  population: { year: number; value: number }[];
}

interface NoInfoAboutProps {
  text: string;
}

export { Country, CountryInfo, NoInfoAboutProps };

