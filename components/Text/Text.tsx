import { type HTMLAttributes, type ReactNode } from 'react'
import clsx from 'clsx'

type textVariant =
  | 'xl'
  | 'md'
  | 'sg'
  | 'sm'
  | 'h1'
  | 'h1s'
  | 'h12'
  | 'h2'
  | 'h2s'
  | 'h23'
  | 'h3'
  | 'h4'
  | 'b1'
  | 'b2'
  | 'b3'
  | 'cta1'
  | 'cta2'
  | 'll'
  | 'lm'
  | 'ls'
type textSize =
  | 'black'
  | 'extrabold'
  | 'bold'
  | 'semibold'
  | 'medium'
  | 'normal'
  | 'light'

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: textSize
  variant?: textVariant
  children: ReactNode
}

export const Text: React.FC<TextProps> = ({
  size = 'light',
  variant = 'h1',
  children,
  className,
  ...props
}) => {
  const text = children as string

  const textProps = clsx(
    'font-poppins text-neutral-0',
    size === 'black' && 'font-black',
    size === 'extrabold' && 'font-extrabold',
    size === 'bold' && 'font-bold',
    size === 'semibold' && 'font-semibold',
    size === 'medium' && 'font-medium',
    size === 'normal' && 'font-normal',
    size === 'light' && 'font-light',
    variant === 'xl' && 'text-sm md:text-xl',
    variant === 'md' && 'text-h1 md:text-md',
    variant === 'sg' && 'text-h1s md:text-sg',
    variant === 'sm' && 'text-h2 md:text-sm',
    variant === 'h1' && 'text-h3 md:text-h1',
    variant === 'h1s' && 'text-h23 md:text-h1s',
    variant === 'h12' && 'text-h3 md:text-h12',
    variant === 'h2' && 'text-b1 md:text-h2',
    variant === 'h2s' && 'text-h3 md:text-h2s',
    variant === 'h23' && 'text-b1 md:text-h23',
    variant === 'h3' && 'text-b3 md:text-h3',
    variant === 'h4' && 'text-h4 md:text-h4',
    variant === 'b1' && 'text-b3 md:text-b1',
    variant === 'b2' && 'text-b2',
    variant === 'b3' && 'text-b2 md:text-b3',
    className
  )

  // eslint-disable-next-line
  const renderText = (text: any) => {
    return (
      <p className={textProps} {...props}>
        {text}
      </p>
    )
  }

  return renderText(text)
}

export default Text
