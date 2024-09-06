import { Fragment, useCallback } from 'react'
import Confetti from 'react-confetti'
import { toast } from 'react-toastify'
import { Dialog, Transition } from '@headlessui/react'

import Button from '@components/Button/Button'
import { Footer } from '@components/Footer/Footer'
import { CloseIcon } from '@components/Icons'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { usePutEarnClaim } from '@services/api'
import { useStore } from '@store/store'
import { getImgIcon } from '@type/common'

interface ClaimRewardsModalProps {
  onClose?: () => void
}

export const ClaimRewardsModal: React.FC<ClaimRewardsModalProps> = ({
  onClose,
}) => {
  const earn = useStore((state) => state.earn)
  const setUserEarn = useStore((state) => state.setUserEarn)
  const { isModalShown, hideModal, showModal } = useModal()
  const { isClaimed, isCompleted } =
    useStore((state) => state.getUserEarn(earn?.id)) || {}

  const imgIcon = getImgIcon(earn?.type || '', earn?.earnSocial?.type)

  const { mutate: claimEarn, isLoading } = usePutEarnClaim(earn?.id, {
    onSuccess: (response) => {
      setUserEarn(response.userEarn)
      hideModal()
      showModal(ModalType.BADGE_MODAL)
    },
    onError: (err) => {
      console.error(err)
      toast.error('Claim failed')
    },
  })
  const handleClaim = useCallback(async () => {
    claimEarn({ earnId: earn?.id })
  }, [claimEarn, earn?.id])

  const closeModal = async () => {
    hideModal()
    onClose && onClose()
  }

  const getText = (earnType?: 'social' | 'survey' | 'referral' | 'reading' | 'receipt') => {
    switch (earnType) {
      case 'survey':
        return 'Survey Completed!';
      case 'receipt':
        return 'You’ve earned 900 points that you can use now or later for exciting Fiero rewards';
      case 'social':
        return 'You’ve shared your photo!';
      default:
        return ''
    }
  }

  return (
    <Transition
      appear
      show={isModalShown(ModalType.CLAIM_REWARDS_MODAL)}
      as={Fragment}
    >
      <Dialog as='div' className='relative z-[60]' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center bg-bg-yellow text-center'>
            <Confetti className='h-full w-full' />
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='flex flex-col min-h-screen w-full transform items-center justify-around overflow-hidden rounded-xl transition-all bg-bg-gray-yellow'>
                <div className='flex h-full w-full flex-col items-center justify-start'>
                  <button
                    className='absolute right-0 top-[10px] text-text-black md:right-8 md:top-1'
                    onClick={closeModal}
                  >
                    <CloseIcon />
                  </button>
                  <div className='relative mt-[140px] h-fit w-fit '>
                    <img
                      src={imgIcon}
                      className='h-[132px] md:h-[192px]'
                      alt='reward'
                    />
                    {earn?.type !== 'survey' && (
                      <img
                        src='/svg/check.svg'
                        alt='check'
                        className='absolute right-2 top-2 h-6 w-6 md:right-4 md:top-4'
                      />
                    )}
                  </div>
                  <Text
                    variant='sm'
                    size='medium'
                    className='mt-[34px] w-full text-center text-text-black md:mt-[59px]'
                  >
                    <span className='font-[600] inline-block text-center text-[24px] max-w-[400px] w-full'>
                      {getText(earn?.type)}
                    </span>
                  </Text>
                  {!isClaimed && (
                    <div className='flex w-full flex-row justify-center px-5'>
                      <Button
                        isLoading={isLoading}
                        disabled={isClaimed || !isCompleted}
                        onClick={handleClaim}
                        className='mt-[52px] flex h-[52px] w-[290px] flex-row items-center justify-center space-x-[11px] py-[14px]'
                      >
                        <img src='/svg/cup.svg' className='h-6' alt='Cup' />
                        <Text
                          variant='h23'
                          className='text-text-white'
                        >
                          <span className='font-[800]'>Claim Your Points</span>
                        </Text>
                      </Button>
                    </div>
                  )}
                  {isClaimed && (
                    <Button
                      disabled
                      className='mt-[52px] h-[72px] px-[89px] py-[14px]'
                    >
                      <Text
                        variant='b1'
                        className='font-[800] uppercase text-text-white'
                      >
                        Points Claimed
                      </Text>
                    </Button>
                  )}
                  <div className='my-[37px] flex flex-row items-center justify-between rounded-full bg-bg-light px-4 py-3'>
                    <img
                      src='/svg/crown.svg'
                      alt='icon'
                      className='h-6 w-6'
                    />
                    <div className='flex flex-row items-center'>
                      <Text
                        variant='b3'
                        className='ml-1 mr-3 text-text-black opacity-60 md:mr-3'
                      >
                        <span className='font-[400] opacity-70'>Rewards</span>
                      </Text>
                    </div>
                    <Text
                      variant='b3'
                      className='mr-1 text-right text-text-black'
                    >
                      <span className='font-[800]'>{earn?.points} Points</span>
                    </Text>
                  </div>
                </div>
                <Footer className='md:hidden' />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ClaimRewardsModal
