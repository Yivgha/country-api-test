import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import { CountryInfoProps } from '@/app/types/interfaces';
import NoInfoAbout from './NoInfoAbout';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import MockFlag from './MockFlag';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const CountryInfo: React.FC<CountryInfoProps> = ({
  countryInfo,
  populationChartData,
}) => {
  const router = useRouter();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-2">{countryInfo.commonName}</h1>
      <div className="mb-4">
        {countryInfo.flag ? (
          <Image
            src={countryInfo.flag}
            alt={`${countryInfo.commonName} flag`}
            width={100}
            height={30}
            className="mb-4 w-auto h-auto max-w-full md:w-32"
            priority
          />
        ) : (
          <MockFlag />
        )}
      </div>
      <p className="text-gray-700">Official Name: {countryInfo.officialName}</p>
      <p className="text-gray-700">Region: {countryInfo.region}</p>

      {countryInfo.borders.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Borders:</h2>
          <div className="flex flex-wrap">
            {countryInfo.borders.map((border) => (
              <div
                key={border.countryCode}
                className="m-1 px-3 py-1 border border-blue-600 rounded cursor-pointer bg-blue-100 hover:bg-blue-200 transition"
                onClick={() => router.push(`/countries/${border.countryCode}`)}
              >
                {border.commonName}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoInfoAbout text="borders" />
      )}

      {populationChartData.labels.length > 0 ? (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Population Over Time</h2>
          <Line data={populationChartData} />
        </div>
      ) : (
        <NoInfoAbout text="population" />
      )}
    </div>
  );
};

export default CountryInfo;
