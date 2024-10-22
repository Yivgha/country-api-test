'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import CountryInfo from '@/components/CountryInfo';
import Loading from '@/components/Loading';
import { CountryInfoType } from '@/app/types/interfaces';

const CountryInfoPage = () => {
  const { countryCode } = useParams();
  const router = useRouter();
  const [countryInfo, setCountryInfo] = useState<CountryInfoType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountryInfo = async () => {
      if (countryCode) {
        try {
          const response = await fetch(`/api/countries/${countryCode}`);
          if (!response.ok) {
            throw new Error('Failed to fetch country info');
          }
          const data: CountryInfoType = await response.json();
          setCountryInfo(data);
        } catch (error) {
          console.error('Error fetching country info:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCountryInfo();
  }, [countryCode]);

  const populationChartData = {
    labels: countryInfo?.population?.map((item) => item.year) || [],
    datasets: [
      {
        label: 'Population',
        data: countryInfo?.population?.map((item) => item.value) || [],
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

      {loading ? (
        <Loading />
      ) : (
        countryInfo && (
          <CountryInfo
            countryInfo={countryInfo}
            populationChartData={populationChartData}
          />
        )
      )}
    </div>
  );
};

export default CountryInfoPage;

