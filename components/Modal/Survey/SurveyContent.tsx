import React, { ChangeEvent, useCallback } from 'react'
import clsx from 'clsx'

import { Text } from '@components/Text'
import { ApiSurveyContent } from '@type/api'

interface SurveyContentProps {
  isText: boolean
  isQuestion: boolean
  isSelected: boolean
  content: ApiSurveyContent
  onSelect?: (contentId: string) => void
  onAnswer?: (answer: string) => void
}

export const SurveyContent: React.FC<SurveyContentProps> = ({
  isText,
  isQuestion,
  isSelected,
  content,
  onSelect,
  onAnswer,
}) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onAnswer && onAnswer(event.target.value)
  }

  const handleSelect = useCallback(async () => {
    onSelect && onSelect(content.id)
  }, [content.id, onSelect])

  return isQuestion ? (
    <div className='flex w-full'>
      <textarea
        onChange={handleChange}
        id='message'
        rows={8}
        className='block w-full rounded-lg border border-gray-600 p-3 dark:focus:ring-blue-500'
        placeholder='Write your thoughts here...'
      ></textarea>
    </div>
  ) : (
    <button
      onClick={handleSelect}
      className={clsx(
        'relative flex flex-col items-center overflow-hidden rounded-lg border border-border-white shadow-md hover:border-border-primary',
        isSelected && 'border border-border-primary',
        !isText && 'md:h-[230px] md:w-[248px]',
        isText && 'h-fit w-full'
      )}
    >
      {!isText && (
        <img
          src={content.imageUrl}
          className='w-full rounded-lg object-cover'
          alt='content'
        />
      )}
      <Text
        variant={isText ? 'h3' : 'b1'}
        className={clsx(
          'w-full px-2 py-3 text-left md:text-center',
          !isText && 'absolute bottom-0 left-0',
          isSelected && 'bg-bg-primary text-text-white',
          !isSelected && 'bg-bg-white text-text-black'
        )}
      >
        {content.name}
      </Text>
    </button>
  )
}

export default SurveyContent
