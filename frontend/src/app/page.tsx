'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Country } from './types/interfaces';
import Loading from '@/components/Loading';

const ITEMS_PER_PAGE = 20;

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/countries');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Calculate the current countries to display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCountries = countries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(countries.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Countries API</h1>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {currentCountries.map((country) => (
              <div
                key={country.countryCode}
                className='bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105'
              >
                <Link href={`/countries/${country.countryCode}`}>
                  <div className='p-6'>
                    <h2 className='text-lg font-bold text-gray-800'>
                      {country.name}
                    </h2>
                    <p className='text-gray-600'>Code: {country.countryCode}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className='flex justify-center mt-4 gap-3'>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className='bg-blue-600 text-white w-32 px-4 py-2 rounded disabled:opacity-50'
            >
              Previous
            </button>
            <span className='self-center'>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className='bg-blue-600 text-white w-32 px-4 py-2 rounded disabled:opacity-50'
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

