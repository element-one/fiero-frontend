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
        title='Harpoon Rewards'
        description='Earn swag, event tickets, VIP access, and more from Harpoon!'
        canonical='https://harpoonrewardsclub.com'
        openGraph={{
          url: 'https://harpoonrewardsclub.com',
          title: 'Harpoon Rewards',
          description:
            'Earn swag, event tickets, VIP access, and more from Harpoon!',
          images: [
            {
              url: 'https://harpoonrewardsclub.com/png/harpoon_logo.png',
            },
          ],
          siteName: 'Harpoon Rewards',
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
