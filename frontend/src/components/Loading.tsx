export default function Loading() {
  return (
    <div className='flex justify-center h-screen'>
      <div className='flex flex-col items-center'>
        <div className='animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-4'></div>
        <p className='text-xl font-semibold text-gray-700'>Loading...</p>
      </div>
    </div>
  );
}

