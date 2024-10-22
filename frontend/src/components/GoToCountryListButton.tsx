import React from 'react';
import { useRouter } from 'next/navigation';

const GoToCountryListButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      className="mb-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
      onClick={() => router.push('/')}
    >
      Go to Country List
    </button>
  );
};

export default GoToCountryListButton;
