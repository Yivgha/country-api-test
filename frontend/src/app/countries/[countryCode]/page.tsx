'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
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
import { CountryInfo } from '../../types/interfaces';
import Loading from '@/components/Loading';
import NoInfoAbout from '@/components/NoInfoAbout';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const CountryInfoPage = () => {
  const { countryCode } = useParams();
  const router = useRouter();
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if (countryCode) {
        try {
          const response = await fetch(`/api/countries/${countryCode}`);
          if (!response.ok) {
            throw new Error('Failed to fetch country info');
          }
          const data: CountryInfo = await response.json();
          setCountryInfo(data);
        } catch (error) {
          console.error('Error fetching country info:', error);
        }
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  const populationChartData = {
    labels: countryInfo?.population?.map((item) => item.year),
    datasets: [
      {
        label: 'Population',
        data: countryInfo?.population?.map((item) => item.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div className='p-6 w-full mx-auto'>
      <button
        className='mb-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition'
        onClick={() => router.push('/')}
      >
        Go to Country List
      </button>

      {countryInfo ? (
        <div className='bg-white shadow-md rounded-lg p-6'>
          <h1 className='text-2xl font-bold mb-2'>{countryInfo.commonName}</h1>
          <div className='mb-4'>
            {countryInfo.flag ? (
              <Image
                src={countryInfo.flag}
                alt={`${countryInfo.commonName} flag`}
                width={100}
                height={30}
                className='mb-4 w-auto h-auto max-w-full md:w-32'
                priority
              />
            ) : (
              <div className='flex items-center justify-center bg-gray-300 rounded h-10 w-24 dark:bg-gray-700'>
                <svg
                  className='w-10 h-10 text-gray-200 dark:text-gray-600'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 18'
                >
                  <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
                </svg>
              </div>
            )}
          </div>

          <p className='text-gray-700'>
            Official Name: {countryInfo.officialName}
          </p>
          <p className='text-gray-700'>Region: {countryInfo.region}</p>

          {countryInfo.borders.length > 0 ? (
            <div className='mt-4'>
              <h2 className='text-lg font-semibold mb-2'>Borders:</h2>
              <div className='flex flex-wrap'>
                {countryInfo.borders.map((border) => (
                  <div
                    key={border.countryCode}
                    className='m-1 px-3 py-1 border border-blue-600 rounded cursor-pointer bg-blue-100 hover:bg-blue-200 transition'
                    onClick={() =>
                      router.push(`/countries/${border.countryCode}`)
                    }
                  >
                    {border.commonName}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <NoInfoAbout text='borders' />
          )}

          {countryInfo.population?.length > 0 ? (
            <div className='mt-4'>
              <h2 className='text-lg font-semibold mb-2'>
                Population Over Time
              </h2>
              <Line data={populationChartData} />
            </div>
          ) : (
            <NoInfoAbout text='population' />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CountryInfoPage;

