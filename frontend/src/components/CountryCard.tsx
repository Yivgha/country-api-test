import Link from 'next/link';
import { Country } from '@/app/types/interfaces';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105'>
      <Link href={`/countries/${country.countryCode}`}>
        <div className='p-6'>
          <h2 className='text-lg font-bold text-gray-800'>{country.name}</h2>
          <p className='text-gray-600'>Code: {country.countryCode}</p>
        </div>
      </Link>
    </div>
  );
};

export default CountryCard;

