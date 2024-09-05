import React from 'react'

interface NameButtonProps {
  name: string
}

const NameButton: React.FC<NameButtonProps> = ({ name }) => {
  const handleClick = () => {
    //TODO
  }

  return (
    <div className='flex h-[46px] w-[46px] items-center justify-center rounded border-gray-200 hover:border-2'>
      <button
        onClick={handleClick}
        type='button'
        className='flex h-[36px] w-[36px] items-center justify-center rounded bg-blue-200'
      >
        <p>{name.slice(0, 1)}</p>
      </button>
    </div>
  )
}

export default NameButton
