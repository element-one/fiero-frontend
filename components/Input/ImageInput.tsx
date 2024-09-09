import {
  ChangeEvent,
  forwardRef,
  ForwardRefRenderFunction,
  useState,
} from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { CloseIcon, UploadIcon } from '@components/Icons'

export interface ImageInputProps {
  onChange?: (file: File | undefined) => void
  className?: string
  capture?: 'user' | 'environment'
}

const ImageInput: ForwardRefRenderFunction<
  HTMLInputElement,
  ImageInputProps
> = ({ onChange, className, capture }, ref) => {
  const [imageUrl, setImageUrl] = useState<string>('')

  const getImageUrl = (file: File) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      setImageUrl(e.target?.result as string)
    }

    reader.readAsDataURL(file)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    onChange?.(file)
    file && getImageUrl(file)
  }

  const handleDelete = () => {
    setImageUrl('')
    onChange?.(undefined)
  }

  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center gap-4',
        className
      )}
    >
      {!imageUrl && (
        <>
          <label
            htmlFor='upload-input'
            className='flex h-[152px] w-[379px] cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border-primary bg-bg-white'
          >
            <UploadIcon />
            <span className='text-h3 text-text-primary font-typewriter'>Upload receipt</span>
            <input
              ref={ref}
              onChange={handleChange}
              capture={capture}
              type='file'
              id='upload-input'
              accept='.jpg,.jpeg,.png,.pdf,.gif'
              className='hidden'
            />
          </label>
          <span className='mb-2 text-b3 opacity-75 font-typewriter'>
            We accept jpg, png, pdf, gif. Max file size is 5MB.
          </span>
        </>
      )}
      {imageUrl && (
        <div className='flex flex-col items-center justify-center gap-2'>
          <Image
            src={imageUrl}
            alt='preview'
            height={200}
            width={100}
            className='max-w-[200px]'
          />
          <span className='cursor-pointer' onClick={handleDelete}>
            <CloseIcon width={24} height={23} />
          </span>
        </div>
      )}
    </div>
  )
}

export default forwardRef<HTMLInputElement, ImageInputProps>(ImageInput)
