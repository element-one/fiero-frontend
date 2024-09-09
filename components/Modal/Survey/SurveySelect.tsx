import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import clsx from 'clsx'
import * as _ from 'lodash'
import { isArray } from 'lodash'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'
import { usePutEarnComplete } from '@services/api/index'
import { ApiEarn, ApiSurvey, ApiUserEarn } from '@type/api'
import { Answers } from '@type/common'

import SurveyContent from './SurveyContent'

interface SurveySelectProps {
  earn: ApiEarn | undefined
  survey: ApiSurvey | undefined
  total: number
  index: number
  onCompleted: (userEarn: ApiUserEarn, index: number) => void
  onNext: (index: number) => void
}

export const SurveySelect: React.FC<SurveySelectProps> = ({
  earn,
  survey,
  total,
  index,
  onCompleted,
  onNext,
}) => {
  const { isText, isQuestion, contents } = survey || {}
  const [answers, setAnswers] = useState<Answers>({})

  const answerIds = _.get(answers, survey?.id || '', [] as string[])

  const handleSelect = useCallback(
    (contentId: string) => {
      if (answerIds.includes(contentId)) {
        const newAnswerIds = answerIds.filter((item) => item !== contentId)
        setAnswers({ ...answers, [survey?.id || '']: newAnswerIds })
      } else {
        if (survey?.type === 'multiple') {
          const newAnswerIds = _.uniq([...answerIds, contentId])
          setAnswers({ ...answers, [survey?.id || '']: newAnswerIds })
        } else {
          setAnswers({ ...answers, [survey?.id || '']: [contentId] })
        }
      }
    },
    [answerIds, answers, survey?.id, survey?.type]
  )

  const handleAnswer = useCallback(
    (answer: string) => {
      setAnswers({ ...answers, [survey?.id || '']: [answer] })
    },
    [answers, survey?.id]
  )

  const { isLoading, mutate } = usePutEarnComplete(earn?.id, {
    onSuccess: (response) => {
      setAnswers({})
      onCompleted(response.userEarn, index)
    },
    onError: (err) => {
      console.log(err)
      toast.error('Submit Failed')
    },
  })

  const handleNextOrSubmit = useCallback(async () => {
    if (answerIds.length === 0) {
      toast('Please select at least one answer')
    }

    if (survey && answerIds.length > 0) {
      if (index + 1 !== total) {
        onNext(index)
        return
      }

      mutate({
        earnId: earn?.id,
        payload: { answers: JSON.stringify(answers) },
      })
    }
  }, [
    answerIds.length,
    survey,
    index,
    total,
    mutate,
    earn?.id,
    answers,
    onNext,
  ])

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='items-left flex w-full flex-col justify-center'>
        <Text variant='h3' className='text-text-black'>
          {`(${index + 1}/${total})`}
        </Text>
        <Text variant='h3' className='text-center text-text-black'>
          <span className='font-[500] font-knockout text-[29px] uppercase'>{survey?.name}</span>
        </Text>
      </div>

      <div
        className={clsx(
          isQuestion && 'mt-8 flex w-full',
          isText && 'mt-8 grid w-full grid-cols-1 gap-4 md:mt-12',
          !isText &&
          !isQuestion &&
          (isArray(contents) && contents.length > 4
            ? 'mt-8 grid grid-cols-3 gap-2'
            : 'mt-8 grid grid-cols-2 gap-2')
        )}
      >
        {isArray(contents) &&
          contents?.map((content) => (
            <SurveyContent
              key={content.id}
              onSelect={handleSelect}
              onAnswer={handleAnswer}
              content={content}
              isSelected={answerIds.includes(content.id)}
              isText={!!isText}
              isQuestion={!!isQuestion}
            />
          ))}
        {contents && !isArray(contents) && (
          <SurveyContent
            key={contents.id}
            onSelect={handleSelect}
            onAnswer={handleAnswer}
            content={contents}
            isSelected={answerIds.includes(contents.id)}
            isText={!!isText}
            isQuestion={!!isQuestion}
          />
        )}
      </div>
      <Button
        onClick={handleNextOrSubmit}
        className='mt-16 h-[52px] px-6 text-[16px] w-[190px] font-typewriter !font-semibold'
        isLoading={isLoading}
      >
        {index + 1 !== total ? 'Next' : 'Submit'}
      </Button>
    </div>
  )
}

export default SurveySelect
