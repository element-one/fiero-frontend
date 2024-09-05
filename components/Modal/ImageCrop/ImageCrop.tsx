import React, { createRef, Fragment, useRef, useState } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { ModalType, useModal } from '@contexts/modal'
import { getAvatarUrl, putAvatarUrl } from '@services/api'
import { useStore } from '@store/store'

export const ImageCropModal = () => {
  const setUser = useStore((state) => state.setUser)
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const [isUploaded, setIsUpload] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [, setCropData] = useState('#')
  const cropperRef = createRef<ReactCropperElement>()

  const { isModalShown, hideModal } = useModal()

  const handleSelectFile = () => {
    if (hiddenFileInput && hiddenFileInput.current)
      hiddenFileInput.current.click()
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImageSrc(reader.result?.toString() || '')
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL())

      const data = await getAvatarUrl()

      const base64ImageData = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL('image/png')
      setCropData(base64ImageData)

      const buffer = Buffer.from(
        base64ImageData.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      )

      try {
        const response = await axios.put(data.uploadUrl, buffer, {
          headers: {
            'Content-Type': 'image/png',
            'Content-Encoding': 'base64',
          },
        })

        if (response.status === 200) {
          setIsUpload(true)
          const userData = await putAvatarUrl(data.s3Url)
          if (userData) {
            setUser(userData.user)
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  const closeModal = () => {
    hideModal()
  }

  return (
    <Transition
      appear
      show={isModalShown(ModalType.IMAGE_CROP_MODAL)}
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
          <div className='fixed inset-0 bg-bg-white bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='flex w-full max-w-md transform overflow-hidden rounded-2xl bg-bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <div className='flex w-full'>
                  {!imageSrc && (
                    <div className='flex h-[204px] w-[535px] flex-col items-center justify-center space-y-2 rounded-xl border border-dashed border-border-orange'>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={onSelectFile}
                        ref={hiddenFileInput}
                        className='hidden'
                      />
                      <img
                        src={'/img/upload_avatar.svg'}
                        className='h-[70px] w-[70px] rounded-full object-fill'
                        alt='upload'
                      />
                      <Text
                        variant='h3'
                        size='semibold'
                        className='text-neutral-0'
                      >
                        Upload your image
                      </Text>
                      <Button onClick={handleSelectFile}>
                        <Text variant='b1' className='text-text-white'>
                          Browse File
                        </Text>
                      </Button>
                    </div>
                  )}

                  {!isUploaded && !!imageSrc && (
                    <div className='flex flex-col items-center'>
                      <Cropper
                        ref={cropperRef}
                        style={{ height: 400, width: '100%' }}
                        zoomTo={0.5}
                        initialAspectRatio={1}
                        preview='.img-preview'
                        src={imageSrc}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        guides={true}
                      />
                      <Button onClick={handleUpload}>Upload Image</Button>
                    </div>
                  )}

                  {isUploaded && (
                    <div className='flex h-[400px] w-full flex-col items-center justify-center space-y-4'>
                      <img
                        src={'/svg/check.svg'}
                        className='h-[200px] w-[200px] rounded-full object-fill'
                        alt='upload'
                      />
                      <Text
                        variant='h1'
                        size='bold'
                        className='text-center text-neutral-0'
                      >
                        Your picture has been successfully uploaded!
                      </Text>
                      <Button onClick={closeModal}>Close</Button>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ImageCropModal
