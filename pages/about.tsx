import React from 'react'
import type { NextPage } from 'next'

import LandingFooter from '@components/Landing/Footer'
import LandingHeader from '@components/Landing/Header'
import { Text } from '@components/Text'

const AboutPage: NextPage = () => {
  return (
    <div className='bg-neutral-1000 pb-10'>
      <LandingHeader />
      <div className='mx-auto max-w-[1200px]'>
        <Text variant='sm' className='mb-6 text-center md:mb-10'>
          Harpoon: by Gen Z for Gen Z
        </Text>
        <Text variant='h3' className='mb-2 px-6 md:mb-4 md:px-40'>
          Hey there, we’re Hugh and Hannah! We started Harpoon because we
          want to reward people for chiming in on the issues, stories, and
          events that matter to our generation. Whether it’s a video of yourself
          reacting to a news story or a great edit you made that makes people
          laugh, we have the power to bring attention to important issues in a
          better way.
        </Text>
        <Text variant='b1' className='mb-10 px-6 md:mb-6 md:px-40'>
          At the end of the day, we believe what our generation wants is simple:
          equal opportunity to succeed in America, rights over our lives and
          bodies, and affordable access to basic necessities like housing,
          healthcare, and education. Harpoon contests give you the info
          you need to start the conversation, but we want you to bring your own
          perspectives, stories, and opinions to the videos you post.
        </Text>
        <Text variant='h3' className='mb-2 px-6 md:mb-4 md:px-40'>
          We know all of you spend hours on TT already, why not win some prizes
          while you’re there 🧐 We are excited to see what you create!
        </Text>
        <Text variant='b1' className='mb-10 px-6 md:mb-6 md:px-40'>
          {`<3 Hugh & Hannah`}
        </Text>
        <Text variant='h3' size='bold' className='mb-2 px-6 md:mb-4 md:px-40'>
          Post videos 📱 Make an impact 🎯 Win cash 💰
        </Text>
        <Text variant='b1' className='mb-10 px-6 md:mb-8 md:px-40'>
          Complete short TikTok challenges to earn tickets and get entered to
          win big prizes.
        </Text>
        <Text variant='h3' size='bold' className='mb-2 px-6 md:mb-4 md:px-40'>
          How It Works
        </Text>
        <Text variant='h3' size='bold' className='mb-2 px-6 md:mb-4 md:px-40'>
          Anyone Can Win
        </Text>
        <Text variant='b1' className='mb-10 px-6 md:mb-8 md:px-40'>
          You don’t need to be an influencer with thousands of followers to have
          an influence. All you need is a Tiktok account and 5 minutes to enter
          to win big prizes.
        </Text>
        <Text variant='h3' size='bold' className='mb-2 px-6 md:mb-4 md:px-40'>
          It’s Super Easy
        </Text>
        <Text variant='b1' className='mb-10 px-6 md:mb-8 md:px-40'>
          We bring the info, you bring the creativity. Every week, we ask our
          members to weigh in on a handful of important conversations. You
          choose the stories and issues that speak to you and turn them into
          TikToks.
        </Text>
        <Text variant='h3' size='bold' className='mb-2 px-6 md:mb-4 md:px-40'>
          Keep it Real
        </Text>
        <Text variant='b1' className='mb-10 px-6 md:mb-8 md:px-40'>
          Our members chime in about current events and social issues, but they
          do it in their own voice. From quick and off-the-cuff reactions to
          full edits, we want you to add your point of view to the conversation
          however you’d like.
        </Text>
        <Text variant='h3' size='bold' className='mb-2 px-6 md:mb-4 md:px-40'>
          Join the Fun
        </Text>
        <Text variant='b1' className='mb-10 px-6 md:mb-8 md:px-40'>
          The internet is overflowing with bullsh*t and we’re all sick and tired
          of it. From lies and misinformation to AI-generated sludge, things are
          getting weird out here. Join Harpoon to become a part of a
          community of young Americans working to change the conversation,
          spread the word about the important stuff, and have a good time doing
          it 🙌
        </Text>
      </div>
      <LandingFooter />
    </div>
  )
}

export default AboutPage
