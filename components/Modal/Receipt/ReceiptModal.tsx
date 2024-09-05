import { FC, Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { useAuth } from '@contexts/auth'
import { ModalType, useModal } from '@contexts/modal'
import { putEarnComplete } from '@services/api'
import { useStore } from '@store/store'

import Init, { ChooseType } from './Init'
import Upload from './Upload'

export interface ReceiptModalProps {
  onClose?: () => void
}

export enum UploadStatus {
  init,
  upload,
  notRecognized,
}

const ReceiptModal: FC<ReceiptModalProps> = ({ onClose }) => {
  const { hideModal, isModalShown, showModal } = useModal()
  const [currentStatus, setCurrentStatus] = useState(UploadStatus.init)
  const [fromCamera, setFromCamera] = useState(false)

  const { isAuthenticated } = useAuth()
  const { setReceiptCache, setUserEarn } = useStore((state) => ({
    setReceiptCache: state.setReceiptCache,
    setUserEarn: state.setUserEarn
  }))

  const closeModal = () => {
    hideModal()
    setCurrentStatus(UploadStatus.init)
    setFromCamera(false)
    onClose?.()
  }

  const handleUploadSuccess = async (earnId: string, receiptId: string) => {
    if (isAuthenticated) {
      const result = await putEarnComplete(earnId, { userReceiptId: receiptId })

      if (result.statusCode === 200) {
        setUserEarn(result.userEarn)
        showModal(ModalType.CLAIM_REWARDS_MODAL)
      }
    } else {
      showModal(ModalType.SIGN_IN_MODAL)
      setReceiptCache(earnId, receiptId)
    }
  }

  const handleUploadFailed = () => {
    setCurrentStatus(UploadStatus.notRecognized)
  }

  const handleInitClick = (chooseType?: ChooseType) => {
    if (chooseType === ChooseType.camera) {
      setFromCamera(true)
    } else {
      setFromCamera(false)
    }
    setCurrentStatus(UploadStatus.upload)
  }

  return (
    <Transition
      appear
      show={isModalShown(ModalType.RECEIPT_MODAL)}
      as={Fragment}
    >
      <Dialog as='div' className='relative z-10' onClose={() => 0}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-modal-bg-dark bg-opacity-70 backdrop-blur-md' />
        </Transition.Child>

        <div className='fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto'>
          <div className='relative h-full max-h-full w-full overflow-y-auto sm:h-fit sm:max-h-[90%] sm:w-fit'>
            <button
              className='absolute right-2 top-2 z-10'
              onClick={closeModal}
            >
              <img
                src='/img/icon_x.png'
                className='h-[32px] w-[32px] object-cover'
                alt='close'
              />
            </button>
            {currentStatus === UploadStatus.init && (
              <Init onButtonClick={handleInitClick} />
            )}
            {(currentStatus === UploadStatus.upload ||
              currentStatus === UploadStatus.notRecognized) && (
                <Upload
                  onUploadSuccess={handleUploadSuccess}
                  onUploadFailed={handleUploadFailed}
                  reUpload={currentStatus === UploadStatus.notRecognized}
                  fromCamera={fromCamera}
                />
              )}
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ReceiptModal
