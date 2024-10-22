interface Country {
  name: string;
  countryCode: string;
}

interface CountryInfoType {
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

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
}

interface CountryInfoProps {
  countryInfo: CountryInfoType;
  populationChartData: {
    labels: (string | number)[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

export {
  Country,
  CountryInfoType,
  NoInfoAboutProps,
  PaginationProps,
  CountryInfoProps,
};
