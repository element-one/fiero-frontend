import { type HTMLAttributes, type ReactNode } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { useStore } from '@store/store'

interface NavButtonProps extends HTMLAttributes<HTMLButtonElement> {
  isSelected: boolean
  isDisabled: boolean
  icon: ReactNode
  path: string
  children: ReactNode
}

const NavButton: React.FC<NavButtonProps> = ({
  path,
  isSelected,
  isDisabled,
  children,
  className,
  icon,
  ...props
}) => {
  const setOpenDrawer = useStore((state) => state.setOpenDrawer)
  const router = useRouter()

  const handleRoute = () => {
    if (isDisabled) return
    router.push(path)
    setOpenDrawer(false)
  }

  return (
    <button
      onClick={handleRoute}
      className={clsx(
        'relative mt-8 flex h-[28px] w-full items-center rounded-lg px-[12px] py-[30px] hover:bg-transparent md:h-[46px] md:py-[13px]',
        className,
        isSelected ? 'md:bg-transparent' : 'bg-transparent',
        isDisabled && 'cursor-not-allowed'
      )}
      {...props}
    >
      <div
        className={clsx(
          'ml-16 flex w-full flex-row items-center justify-start space-x-2 text-b1 hover:text-text-primary md:ml-0 md:mt-0',
          isSelected && 'text-text-primary',
          isDisabled && 'text-neutral-600'
        )}
      >
        {icon}
        <span
          className={clsx(
            isSelected && 'text-text-primary',
            isDisabled && 'text-neutral-600',
            'font-[500] uppercase md:text-[14px]'
          )}
        >
          {children}
        </span>
      </div>
    </button>
  )
}

export default NavButton
