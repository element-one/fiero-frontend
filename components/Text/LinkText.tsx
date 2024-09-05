import { type HTMLAttributes } from 'react'
import clsx from 'clsx'

import parse from 'html-react-parser'

type textVariant =
  | 'xl'
  | 'md'
  | 'sm'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'b1'
  | 'b2'
  | 'cta1'
  | 'cta2'
  | 'll'
  | 'lm'
  | 'ls'
type textSize = 'extrabold' | 'bold' | 'semibold' | 'light'

interface LinkTextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: textSize
  variant?: textVariant
  children: string | undefined
}

export const LinkText: React.FC<LinkTextProps> = ({
  size = 'light',
  variant = 'h1',
  children,
  className,
  ...props
}) => {
  let text = (children as string) || ''

  const textProps = clsx(
    'font-poppins',
    size === 'extrabold' && 'font-extrabold',
    size === 'bold' && 'font-bold',
    size === 'semibold' && 'font-semibold',
    size === 'light' && 'font-normal',
    variant === 'xl' && 'text-sm md:text-xl',
    variant === 'md' && 'text-h1 md:text-md',
    variant === 'sm' && 'text-h2 md:text-sm',
    variant === 'h1' && 'text-h3 md:text-h1',
    variant === 'h2' && 'text-b1 md:text-h2',
    variant === 'h3' && 'text-b1 md:text-h3',
    variant === 'b1' && 'text-b3 md:text-b1',
    variant === 'b2' && 'text-b2',
    className
  )

  if (text.includes('<a href=')) {
    text = text.replaceAll(
      '<a href=',
      `<a className="text-blue-500 underline" target="_blank" href=`
    )
  }

  return (
    <div className={textProps} {...props}>
      {parse(text)}
    </div>
  )
}

export default LinkText
