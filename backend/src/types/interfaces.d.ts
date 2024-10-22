interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[];
}

interface PopulationData {
  country: string;
  populationCounts: { year: number; value: number }[];
}

interface FlagData {
  name: string;
  flag: string;
}

export { CountryInfo, PopulationData, FlagData };
