import React, { type ReactNode } from 'react'
import { NextSeo } from 'next-seo'

import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='h-full w-full overflow-hidden bg-bg-gray'>
      <NextSeo
        title='Fiero Rewards'
        description='Earn swag, event tickets, VIP access, and more from Fiero!'
        canonical='https://www.fierotequilarewards.com'
        openGraph={{
          url: 'https://www.fierotequilarewards.com',
          title: 'Fiero Rewards',
          description:
            'Earn swag, event tickets, VIP access, and more from Fiero!',
          images: [
            {
              url: 'https://www.fierotequilarewards.com/png/fiero_logo.png',
            },
          ],
          siteName: 'Fiero Rewards',
        }}
      />
      <div className='relative flex h-full overflow-hidden md:container md:mx-auto'>
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default Layout
