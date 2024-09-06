import { useRouter } from 'next/router'

import Button from '@components/Button/Button'
import { Text } from '@components/Text'

const SignUpItems = ({
  imageName,
  title,
  description,
}: {
  imageName: string
  title: string
  description: string
}) => (
  <div className='mb-10 flex flex-col items-center justify-center rounded-3xl border-transparent bg-[#1e1e1e33] px-8 py-10 backdrop-blur-md md:mb-0'>
    <img
      src={`/img/${imageName}.svg`}
      alt={title}
      width='48px'
      className='mb-2'
    />
    <Text size='bold' variant='h2' className='mb-2'>
      {title}
    </Text>
    <Text variant='h3' className='max-w-[200px] text-center'>
      {description}
    </Text>
  </div>
)

const LandingSignUpProcess = () => {
  const router = useRouter()

  const handleSignup = () => {
    router.push('/')
  }

  return (
    <div className='mb-20 flex w-full flex-col flex-wrap bg-[url("/img/glass_signup_process_background.png")] bg-cover bg-fixed bg-[50%] bg-repeat pt-16 md:bg-scroll md:bg-no-repeat md:pb-48 md:pt-72'>
      <Text
        variant='md'
        size='bold'
        className='mb-20 flex w-full justify-center text-center leading-title-height md:mb-32'
      >
        Easy Sign-Up Process
      </Text>
      <div className='mb-10 flex w-full flex-row flex-wrap justify-center md:mb-20 md:space-x-28'>
        <SignUpItems
          imageName='glass_signup_icon'
          title='Sign Up'
          description='Share your name, email, and zip code'
        />
        <SignUpItems
          imageName='glass_verify_age_icon'
          title='Verify Age'
          description='Confirm your legal drinking age'
        />
        <SignUpItems
          imageName='glass_create_profile_icon'
          title='Create Profile'
          description='Upload a picture if you’d like, and start earning!'
        />
      </div>
      <div className='flex w-full flex-row justify-center'>
        <Button onClick={handleSignup}>
          <Text
            variant='b1'
            size='semibold'
            className='px-7 py-1 text-neutral-1000'
          >
            Enter Fiero
          </Text>
        </Button>
      </div>
    </div>
  )
}

export default LandingSignUpProcess
