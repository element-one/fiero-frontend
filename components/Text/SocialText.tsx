import { type HTMLAttributes, type ReactNode } from 'react'
import { useCopyToClipboard } from 'react-use'
import clsx from 'clsx'

import { findHashtag, findMention } from '@utils/utils'

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

interface SocialTextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: textSize
  variant?: textVariant
  children: ReactNode
  hasHashtag?: boolean
  hasMention?: boolean
}

let hashtagIndex = 0
let mentionIndex = 0
let hashtag = ''
let mention = ''

export const SocialText: React.FC<SocialTextProps> = ({
  size = 'light',
  variant = 'h1',
  hasHashtag,
  hasMention,
  children,
  className,
  ...props
}) => {
  const [, copyToClipboard] = useCopyToClipboard()

  const text = (children as string) || ''

  const textProps = clsx(
    'text-text-black opacity-60',
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

  // eslint-disable-next-line
  const renderText = (text: any) => {
    if (hasHashtag || hasMention) {
      return (
        <span className={textProps} {...props}>
          {text}
        </span>
      )
    }

    return (
      <p className={textProps} {...props}>
        {text}
      </p>
    )
  }

  const renderHashtag = (text: string) => {
    return (
      <span
        className={clsx(
          'text-text-black',
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
          variant === 'b1' && 'text-b2 md:text-b1',
          variant === 'b2' && 'text-b2',
          className
        )}
        {...props}
      >
        <button onClick={() => copyToClipboard(text)}>{text}</button>
      </span>
    )
  }

  const renderMention = (text: string) => {
    return (
      <span
        className={clsx(
          'text-text-black',
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
          variant === 'b1' && 'text-b2 md:text-b1',
          variant === 'b2' && 'text-b2',
          className
        )}
        {...props}
      >
        <button onClick={() => copyToClipboard(text)}>{text}</button>
      </span>
    )
  }

  if (hasHashtag) {
    hashtag = findHashtag(text)
    hashtagIndex = text.indexOf(hashtag)
  }

  if (hasMention) {
    mention = findMention(text)
    mentionIndex = text.indexOf(mention)
  }

  if (hashtagIndex < mentionIndex) {
    return (
      <div className=''>
        {renderText(text?.slice(0, hashtagIndex))}
        {renderHashtag(
          text?.slice(hashtagIndex, hashtagIndex + hashtag.length)
        )}
        {renderText(text?.slice(hashtagIndex + hashtag.length, mentionIndex))}
        <br />
        {renderMention(
          text?.slice(mentionIndex, mentionIndex + mention.length)
        )}
        {renderText(text?.slice(mentionIndex + mention.length, text.length))}
      </div>
    )
  }

  if (hashtagIndex > mentionIndex) {
    return (
      <div className=''>
        {renderText(text?.slice(0, mentionIndex))}
        {renderMention(
          text?.slice(mentionIndex, mentionIndex + mention.length)
        )}
        {renderText(text?.slice(mentionIndex + mention.length, hashtagIndex))}
        <br />
        {renderHashtag(
          text?.slice(hashtagIndex, hashtagIndex + hashtag.length)
        )}
        {renderText(text?.slice(hashtagIndex + hashtag.length, text.length))}
      </div>
    )
  }

  return renderText(text)
}

export default SocialText
