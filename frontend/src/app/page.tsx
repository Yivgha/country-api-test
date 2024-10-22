'use client';

import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

export default function Home() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('api/hello');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setServerMessage(data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        {isLoading ? (
          <Loading />
        ) : (
          <div>{serverMessage ?? <p>Nothing found on server</p>}</div>
        )}
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'>
        <div>This is footer</div>
      </footer>
    </div>
  );
}

