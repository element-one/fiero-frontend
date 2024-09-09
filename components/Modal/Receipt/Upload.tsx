import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'

import Button from '@components/Button/Button'
import { ArrowRightIcon } from '@components/Icons'
import ImageInput from '@components/Input/ImageInput'
import Text from '@components/Text/Text'
import { getEarnReceiptUrl, postCheckReceipt } from '@services/api'
import http from '@services/axios/client'
import { useStore } from '@store/store'

export interface UploadProps {
  onUploadSuccess: (earnId: string, receiptId: string) => void
  onUploadFailed: () => void
  reUpload: boolean
  fromCamera?: boolean
}

const Upload: FC<UploadProps> = ({
  onUploadSuccess,
  onUploadFailed,
  reUpload = true,
  fromCamera,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const imageInputRef = useRef<HTMLInputElement | null>(null)
  const earn = useStore((state) => state.earn)

  useEffect(() => {
    if (isMobile && imageInputRef.current) {
      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: false,
      })

      imageInputRef.current.dispatchEvent(event)
    }
  }, [])

  const handleUpload = async (file: File) => {
    try {
      setLoading(true)

      const data = await getEarnReceiptUrl()
      const response = await http.put(data.uploadUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
        withCredentials: false,
      })

      if (response.status === 200) {
        const response = await postCheckReceipt(earn?.id, data.s3Url)
        onUploadSuccess(response.earnId, response.userReceiptId)
      }
    } catch (err) {
      onUploadFailed()
      console.log(err)
    } finally {
      setLoading(false)
      setSelectedFile(undefined)
    }
  }

  const handleImageInputChange = async (file: File | undefined) => {
    setSelectedFile(file)

    if (isMobile) {
      setTimeout(() => {
        file && handleUpload(file)
      }, 20)
    }
  }

  return (
    <Transition.Child
      as={Fragment}
      enter='ease-out duration-300'
      enterFrom='opacity-0 scale-95'
      enterTo='opacity-100 scale-100'
      leave='ease-in duration-200'
      leaveFrom='opacity-100 scale-100'
      leaveTo='opacity-0 scale-95'
    >
      <Dialog.Panel className='h-full min-h-[560px] w-full transform overflow-auto rounded-xl bg-[url(/png/onboarding_bg.png)] bg-center bg-cover text-left align-middle text-white shadow-xl transition-all sm:h-fit md:w-[482px]'>
        {!loading && (
          <div className='flex h-full min-h-[560px] flex-col items-center justify-center gap-7'>
            {reUpload ? (
              <div className='flex flex-col items-center justify-center gap-5 pt-2'>
                <Image
                  className='mt-5'
                  src='/img/receipt_not_recognized.png'
                  alt='receipt not recognized'
                  width={177}
                  height={199}
                />
                <p className='text-h12 font-semibold'>Receipt not recognized</p>
                <p className='w-[350px] text-center text-h3'>
                  We&apos;re sorry, we couldn&apos;t recognize your
                  <br />
                  receipt. Please email it to us for
                  <br />
                  manual credit.
                </p>
              </div>
            ) : (
              <Text className='mb-8 font-typewriter'>Upload your receipt</Text>
            )}

            <ImageInput
              ref={imageInputRef}
              onChange={handleImageInputChange}
              capture={isMobile && fromCamera ? 'environment' : undefined}
            />

            {!isMobile && (
              <Button
                onClick={() => {
                  selectedFile && handleUpload(selectedFile)
                }}
                disabled={!selectedFile}
                className='!bg-bg-white text-text-black hover:opacity-95 w-[238px] disabled:!bg-bg-white disabled:!opacity-80'
              >
                Upload <ArrowRightIcon />
              </Button>
            )}

            {reUpload && (
              <div className='flex flex-col items-center justify-center pb-12 text-b1'>
                <p className='font-semibold'>Have trouble scanning?</p>
                <a
                  href='mailto:cheers@glass.fun'
                  className='text-b1 underline decoration-1'
                >
                  Email us your receipt!
                </a>
              </div>
            )}
          </div>
        )}
        {loading && (
          <div className='flex h-full min-h-[560px] w-full items-center justify-center'>
            <Image
              className='w-[130px]'
              src='/img/receipt_uploading.svg'
              alt='uploading'
              width={194}
              height={293}
            />
          </div>
        )}
      </Dialog.Panel>
    </Transition.Child>
  )
}

export default Upload
