import { type ButtonHTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type buttonVariant = 'regular' | 'outline' | 'link'
type buttonSize = 'large' | 'small'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: buttonSize
  variant?: buttonVariant
  isLoading?: boolean
  children: ReactNode
}

const Button: React.FC<ButtonProps> = ({
  size = 'large',
  variant = 'regular',
  isLoading = false,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        clsx(
          'flex h-fit w-fit items-center font-typewriter text-text-white justify-center rounded-[10px] text-xs font-semibold transition-all',
          'disabled:cursor-not-allowed disabled:opacity-50',
          size === 'large' && 'px-[16px] py-[12px] text-cta1',
          size === 'small' && 'px-2 py-2',
          variant === 'regular' &&
          'bg-button-primary text-button-text-primary hover:bg-button-primary-hover active:bg-button-primary-hover',
          variant === 'outline' &&
          'border border-button-primary text-button-primary hover:border-button-primary-hover hover:text-button-primary-hover disabled:border-primary-600 disabled:bg-transparent',
          variant === 'link' &&
          'text-brand hover:underline disabled:no-underline',
          isLoading && 'cursor-not-allowed',
          !isLoading && 'cursor-pointer',
          className
        )
      )}
      {...props}
    >
      {isLoading && (
        <svg
          className='mr-3 h-5 w-5 animate-spin text-neutral-800'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button
