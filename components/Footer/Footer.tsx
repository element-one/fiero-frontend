import { FC } from "react"
import Link from "next/link"
import clsx from "clsx"

export interface FooterProps {
  className?: string
}

export const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <div className={
      clsx(
        'flex max-w-[350px] mt-4 flex-col gap-2 px-8 py-4',
        className
      )
    }>
      <p className='text-center text-[10px] font-semibold text-xs text-text-black-2'>
        Powered By{' '}
        <a
          href='https://www.glass.fun'
          className='underline'
          target='_blank'
        >
          GLASS.fun
        </a>
      </p>
      <p className='text-center text-[10px] font-semibold text-xs text-text-black-2'>
        <Link href='/tos' target='_blank'>
          Terms and Conditions
        </Link>{' '}
        |{' '}
        <Link href='/privacy' target='_blank'>
          Privacy Policy
        </Link>
      </p>
    </div>
  )
}
