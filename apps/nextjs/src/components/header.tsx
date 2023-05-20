import Image from 'next/image';

export const Header = () => {
  return (
    <header className='container w-full border border-b-gray-800 bg-gray-950'>
      <div className='flex h-[64px] w-full items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Image
            src='/logo.png'
            alt='Logo'
            width={48}
            height={48}
            className='h-10 w-10'
          />
          <GeistIcon />
          <h1 className='text-2xl font-bold text-gray-100'>targett</h1>
        </div>
        <div>Perfil e relacionados</div>
      </div>
    </header>
  );
};

const GeistIcon = () => {
  return (
    <svg
      fill='none'
      height='32'
      shape-rendering='geometricPrecision'
      stroke='currentColor'
      stroke-linecap='round'
      stroke-linejoin='round'
      stroke-width='1'
      viewBox='0 0 24 24'
      width='32'
      className='text-gray-800'
    >
      <path d='M16.88 3.549L7.12 20.451'></path>
    </svg>
  );
};
