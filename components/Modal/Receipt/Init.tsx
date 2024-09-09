import { FC, Fragment, useState } from 'react'
import { isMobile } from 'react-device-detect'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'

import Button from '@components/Button/Button'
import { ArrowRightIcon } from '@components/Icons'
import Text from '@components/Text/Text'

export enum ChooseType {
  album,
  camera,
}

export interface InitProps {
  onButtonClick: (chooseType?: ChooseType) => void
}

const Init: FC<InitProps> = ({ onButtonClick }) => {
  const [actionVisible, setActionVisible] = useState(false)

  const handleClick = () => {
    if (isMobile) {
      setActionVisible(true)
    } else {
      onButtonClick()
    }
  }

  const handleCameraActionClick = () => {
    setActionVisible(false)
    onButtonClick(ChooseType.camera)
  }

  const handleAlbumActionClick = () => {
    setActionVisible(false)
    onButtonClick(ChooseType.album)
  }

  return (
    <>
      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Dialog.Panel className='h-full min-h-[740px] w-full transform overflow-hidden rounded-xl px-12  bg-[url(/png/onboarding_bg.png)] bg-cover bg-center text-left align-middle text-white shadow-xl transition-all sm:h-[800px]'>
          <div className='flex h-full w-full flex-col items-center justify-center gap-8 pb-10'>
            <Image
              src='/png/receipt_modal_beer.png'
              alt='receipt'
              width={360}
              height={360}
              className="w-"
            />
            <Text className='text-center text-[28px] font-typewriter leading-[31px]'>
              Take a picture of your
              <br />
              receipt to earn
              <br />
              Fiero points
            </Text>
            <Button className='!bg-bg-white text-text-black hover:opacity-95 w-[236px]' onClick={handleClick}>
              {isMobile ? 'Take a picture' : 'Upload receipt'}
              <ArrowRightIcon />
            </Button>
          </div>
        </Dialog.Panel>
      </Transition.Child>

      {isMobile && actionVisible && (
        <div className='absolute bottom-0 left-0 z-[999] flex h-full w-full items-end backdrop-blur-md'>
          <div className='flex h-full w-full flex-col items-center justify-end gap-4 px-4 pb-12'>
            <Button className='w-full bg-bg-white text-text-black' onClick={handleCameraActionClick}>
              Camera
            </Button>
            <Button className='w-full bg-bg-white text-text-black' onClick={handleAlbumActionClick}>
              Album
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default Init
