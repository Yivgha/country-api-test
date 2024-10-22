import { NoInfoAboutProps } from '../app/types/interfaces';

export default function NoInfoAbout({ text }: NoInfoAboutProps) {
  return <p className='text-gray-500 my-3'>No info about {text}</p>;
}

