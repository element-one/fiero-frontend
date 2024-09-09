import React, { Fragment, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'
import clsx from 'clsx'
import { Dialog, Transition } from '@headlessui/react'
import axios, { AxiosError } from 'axios'

import { CloseIcon } from '@components/Icons'
import { Text } from '@components/Text'
import LinkText from '@components/Text/LinkText'
import { ModalType, useModal } from '@contexts/modal'
import {
  getInstagramPosts,
  putEarnComplete,
  usePutEarnComplete,
} from '@services/api/index'
import { useStore } from '@store/store'
import { ApiInstagramPost } from '@type/api'
import { isInstagramVerified, isTrue } from '@utils/utils'

import CopyCard from '../CopyCard/CopyCard'
import LockCard from '../LockCard/LockCard'

import InstagramConnect from './InstagramConnect'
import InstagramPost from './InstagramPost'
import InstagramTask from './InstagramTask'

interface InstagramQuestModalProps {
  onClose?: () => void
  onClick?: () => void
}

export const InstagramQuestModal: React.FC<InstagramQuestModalProps> = ({
  onClose,
}) => {
  const { isModalShown, hideModal, showModal } = useModal()
  const [posts, setPosts] = useState<ApiInstagramPost[]>([])
  const [isPosted, setIsPosted] = useState<boolean>(false)

  const hasPosts = posts.length > 0

  const user = useStore((state) => state.user)
  const setUser = useStore((state) => state.setUser)
  const earn = useStore((state) => state.earn)
  const { earnSocial } = earn || {}
  const removeEarn = useStore((state) => state.removeEarn)
  const setUserEarn = useStore((state) => state.setUserEarn)
  const { isCompleted, isPending } =
    useStore((state) => state.getUserEarn(earn?.id)) || {}
  const isInstagramConnected = isInstagramVerified(user)
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { mutate: completeEarn, isLoading: isCompleteLoading } =
    usePutEarnComplete(earn?.id, {
      onSuccess: (data) => {
        setUserEarn(data.userEarn)
        setPosts([])
      },
      onError: (err) => {
        console.error(err)
        toast.error("Selected post doesn't contain the hashtag")
      },
    })

  const closeModal = () => {
    if (hasPosts) {
      setPosts([])
    } else {
      removeEarn()
      hideModal()
      onClose && onClose()
    }
  }

  const handlePost = () => {
    if (earnSocial?.type === 'instagram_follow') {
      if (isInstagramConnected) {
        setTimeout(handleComplete, 5000)
      }
      return;
    }
    setIsPosted(true)
  }

  const handleTaskComplete = useCallback(async (postUrl?: string) => {
    try {
      setErrorMessage('')
      setIsLoading(true)
      const response = await putEarnComplete(earn?.id, { postUrl })
      setIsLoading(false)
      setUserEarn(response.userEarn)
      setUser(response.userEarn?.user)

      if (response.userEarn.isPending) return

      hideModal()
      showModal(ModalType.CLAIM_REWARDS_MODAL)
    } catch (error: unknown) {
      setIsLoading(false)
      const err = error as AxiosError<{ message: string }>

      switch (err.response?.data.message) {
        case 'error.earn-not-completed':
          setErrorMessage("Earn not completed")
          break;
        case 'error.social-fetch-content-failed':
          setErrorMessage("Social fetch content failed")
          break;
      }
    }
  }, [earn?.id, hideModal, setUser, setUserEarn, showModal])

  const handleComplete = useCallback(
    async (post: ApiInstagramPost) => {
      if (isTrue(process.env.NEXT_PUBLIC_INSTAGRAM_ENABLED)) {
        completeEarn({
          earnId: earn?.id,
          payload: {
            id: post.id,
            caption: post.caption,
          },
        })
      } else {
        handleTaskComplete()
      }
    },
    [completeEarn, earn?.id, handleTaskComplete]
  )

  const handleGetPost = async () => {
    try {
      const response = await getInstagramPosts()
      if (response.statusCode === 200) {
        setPosts(response.posts)
      }
    } catch (err) {
      if (
        axios.isAxiosError(err) &&
        err.response &&
        err?.response.data.statusCode === 400 &&
        err?.response.data.message === 'error.social-not-accessible'
      ) {
        showModal(ModalType.INSTAGRAM_RECONNECT_MODAL)
      }
    }
  }

  return (
    <Transition
      appear
      show={isModalShown(ModalType.INSTAGRAM_CHALLENGE_MODAL)}
      as={Fragment}
    >
      <Dialog as='div' className='relative z-[60]' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='relative mt-0 min-h-screen w-full max-w-[1000px] rounded-lg transform overflow-hidden bg-bg-white text-left align-middle transition-all md:min-h-fit'>
                <div className='z-0 pt-6 md:pt-14'>
                  <button
                    className='absolute right-3 top-4 text-text-black md:right-8'
                    onClick={closeModal}
                  >
                    <CloseIcon />
                  </button>

                  {hasPosts && (
                    <InstagramPost
                      posts={posts}
                      onConfirm={handleComplete}
                      isLoading={isCompleteLoading}
                    />
                  )}

                  {!hasPosts && (
                    <div className='h-fit min-h-[calc(100vh-24px)] md:min-h-fit flex flex-col justify-between'>
                      <div className='flex flex-col items-center justify-center'>
                        <div className='mt-4 flex w-full flex-col items-center justify-center'>
                          <div className='w-[180px] md:mr-4 md:w-[220px] border-[12px] overflow-hidden rounded-tl-full rounded-tr-full border-border-white'>
                            <img
                              src={earn?.badge?.imageUrl}
                              className='h-full w-full object-cover'
                              alt='badge'
                            />
                          </div>
                          <div className='mt-5 flex flex-1 flex-col items-center px-4'>
                            <Text
                              variant='h4'
                              className='text-center text-text-black'
                            >
                              <span className='text-[25px] uppercase font-knockout font-[600]'>
                                {earn?.name}
                              </span>
                            </Text>
                            <LinkText
                              variant='b1'
                              className='mt-3 w-full font-typewriter text-[14px] max-w-[520px] text-center text-text-black opacity-60'
                            >
                              {earn?.description}
                            </LinkText>
                            <div className='mb-2 mt-8 flex flex-row items-center justify-between rounded-full bg-bg-light px-4 py-3 md:mb-4 md:mt-10'>
                              <div className='flex flex-row items-center'>
                                🌶️&nbsp;
                                <Text
                                  variant='b3'
                                  className='ml-1 mr-3 font-typewriter text-text-black md:mr-3 opacity-60'
                                >
                                  Rewards
                                </Text>
                              </div>
                              <Text
                                variant='b3'
                                className='mr-1 text-right font-typewriter text-text-black font-semibold'
                              >
                                {earn?.points} Points
                              </Text>
                            </div>
                          </div>
                          {
                            earnSocial?.type === 'instagram_post' ? (
                              <div className='w-[90%] max-w-[387px] mt-10'>
                                <CopyCard hashtagText={earnSocial?.hashtag} />
                              </div>
                            ) : undefined
                          }
                        </div>
                      </div>

                      <div className={
                        clsx(
                          'flex justify-center w-full overflow-hidden mt-4',
                          isInstagramConnected ? 'h-[380px]' : 'h-[680px]'
                        )
                      }>
                        <div className='bg-bg-white rounded-full w-[2048px] pb-6 shrink-0 h-[2048px] flex items-center flex-col'>
                          {!isInstagramConnected ? (
                            <>
                              <InstagramConnect className='my-6' user={user} />
                              <LockCard
                                title='You need to connect with Instagram in order to join this challenge'
                                social='instagram'
                              />
                            </>
                          ) : (
                            <>
                              <div className='mt-1'>
                                <InstagramTask
                                  social={earnSocial}
                                  isPosted={isPosted}
                                  isCompleted={isCompleted}
                                  isPending={isPending}
                                  onComplete={
                                    isPosted
                                      ? (isTrue(process.env.NEXT_PUBLIC_TIKTOK_ENABLED) ? handleGetPost : handleTaskComplete)
                                      : handlePost}
                                  errorMessage={errorMessage}
                                  isLoading={isLoading}
                                />
                              </div>
                              <div>
                                {isPending && (
                                  <div className='flex w-full px-2 flex-col items-center justify-center md:items-end'>
                                    <Text
                                      variant='b1'
                                      size='normal'
                                      className='text-neutral-300 font-typewriter'
                                    >
                                      Pause for a sip!
                                    </Text>
                                    <p
                                      className='text-neutral-300 font-typewriter text-xs mt-2 overflow-hidden whitespace-break-spaces px-4 text-center w-screen max-w-[520px]'
                                    >
                                      {`Pause for a sip! Based on Instagram's guidelines, your follow can take up to 24 hours to verify.`}
                                    </p>
                                  </div>
                                )}
                                {!isPending && (
                                  <div className='text-center text-[14px] font-typewriter'>
                                    <span className='text-text-black opacity-70'>
                                      For full posting terms and conditions,
                                    </span>
                                    <Link
                                      href='/tos'
                                      target='_blank'
                                      className='text-text-primary underline'
                                    >
                                      click here.
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default InstagramQuestModal
