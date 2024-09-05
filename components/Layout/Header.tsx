import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='p-5'>
      <div className='relative top-[4px] flex flex-row justify-between'>
        <Link href='/' passHref>
          <Image
            priority
            src={'/img/glass.png'}
            alt='Glass logo'
            width={156}
            height={81}
          />
        </Link>
        <div className='flex items-center space-x-6'></div>
      </div>
      <div className='flex flex-row justify-between'></div>
    </header>
  )
}

export default Header
