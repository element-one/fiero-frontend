import React from 'react'
import type { NextPage } from 'next'

import FaqCard from '@components/FaqCard/FaqCard'
import LandingFooter from '@components/Landing/Footer'
import LandingHeader from '@components/Landing/Header'

const FAQS = [
  {
    question: 'What is GLASS?',
    answer:
      'GLASS is for the social heroes. The ones who make the reservations, who order one more round for the table, who get their friends off the couch and into the stands or onto the dance floor.We’re a new type of rewards platform, enabling you to unlock exclusive gifts and experiences from your favorite social brands. Earn points by participating in challenges - going out with friends, visiting your favorite bars, and more - and redeem those points for world-leading sports, music, dining, and drinking rewards.',
  },
  {
    question: 'Who can join GLASS?',
    answer:
      'You can! As long as you’re over 21. All that’s needed to sign up is an email address, phone number, and US zip code.',
  },

  {
    question: 'Why do I need to share my zip code?',
    answer:
      'US alcohol regulation is crazy complex. Massachusetts doesn’t allow happy hours, for example; Illinois allows them for up to four hours at a time, while in Indiana, any discounts have to be offered all day. In New York, alcohol brands are allowed to offer free “shirts, hats, and visors,” to fans, but for socks or pants they’d have to charge.When you share your zip code, GLASS makes sure you’ll be able to access all the rewards and benefits for which you’re eligible.',
  },

  {
    question: 'How do I earn points?',
    answer:
      'Once you sign up, you can start earning points by joining brand challenges. Some of these challenges are ongoing. For example, you can earn any time by getting your friends together at a bar. Other challenges are time-limited, such as voting on a brand’s upcoming festival partnership.To earn points, click into the challenges on the Home page or the brand’s page, and follow the instructions to complete the challenge.',
  },
  {
    question: 'How do I redeem my points?',
    answer:
      'Once you’ve earned points from a brand, you’ll be able to redeem them for rewards offered by that same brand.To redeem your points, click into the rewards on the Home page or the brand’s page. If you have enough points, you’ll be able to unlock the reward by clicking “Claim Reward.”',
  },
  {
    question: 'Where can I see my current point holdings?',
    answer:
      'Find your current point holdings, as well any rewards you’ve earned, on your Profile page.',
  },
  {
    question: 'Why is GLASS built in web3?',
    answer:
      'Web3 represents a new way of thinking about ownership. In web3, you and your identity come first, rather than the platform. In other words, when you earn points from brands on GLASS, those points belong to you, not to GLASS or the brands.Because you own your own points, you can take them with you to access a range of redemption opportunities across sports, music, entertainment, dining, and more.Beverages can enhance social occasions, anywhere, any time. Now, your points and rewards can, as well.',
  },
  {
    question:
      'Blockchain? I prefer bourbon. Do I need to understand the world of crypto to use GLASS?',
    answer:
      'Just like you don’t need to know how to code to visit a website, you don’t need to understand web3, crypto, or blockchain to use GLASS.When you sign up for GLASS and we create your account, it comes with a wallet - a secure way to store the points and rewards you earn on the blockchain. The wallet is non-custodial, which means it’s controlled by you. Neither GLASS nor the brands have access, but you can log in any time with your email address and password. No blockchain knowledge is required.',
  },
  {
    question:
      'I’m a cocktail-loving degen. Can I connect my existing crypto wallet to GLASS?',
    answer:
      'We’ll add this capability in the future, but for now, we don’t offer external wallet connection. We’re most focused today on helping you socialize with friends and unlock brand rewards.',
  },
  {
    question: 'How does GLASS choose which brands to feature?',
    answer:
      'We’re launching with a curated group of brand partners who share our vision for using technology to build strong social communities.We’ll be rolling out new brands over time. Got a special request? Let us know.',
  },
  {
    question:
      'I have a question or suggestion for GLASS. Where can I share it?',
    answer: 'We can’t wait! Send us a note at cheers@glass.fun.',
  },
]

const FaqPage: NextPage = () => {
  return (
    <div className='bg-neutral-1000'>
      <div className='container mx-auto bg-neutral-1000 pb-10'>
        <LandingHeader />

        <div className='m-auto max-w-[940px] px-9'>
          <div className='flex h-[138px] w-full items-center justify-center text-[42px] font-semibold text-white'>
            FAQ
          </div>

          <div className='grid grid-cols-1 gap-4'>
            {FAQS.map((item, index) => {
              return (
                <FaqCard
                  question={item.question}
                  answer={item.answer}
                  key={index}
                />
              )
            })}
          </div>
        </div>

        <LandingFooter />
      </div>
    </div>
  )
}

export default FaqPage
