import { EarnIcon, HomeIcon, RedeemIcon, SettingsIcon } from '@components/Icons'
import { NavItem } from '@type/navigation'

const AGE_VERIFICATION_KEY = 'is-age-verified'

const NAV_ITEMS: Array<NavItem> = [
  {
    name: 'Home',
    path: '/',
    icon: <HomeIcon />,
    active: true,
  },
  {
    name: 'Rewards',
    path: '/prizes',
    icon: <RedeemIcon />,
    active: true,
  },
  {
    name: 'Challenges',
    path: '/contests',
    icon: <EarnIcon />,
    active: true,
  },
  // {
  //   name: 'Events',
  //   path: '/event',
  //   icon: <EventIcon />,
  //   active: true,
  // },
  {
    name: 'My Profile',
    path: '/profile',
    icon: <SettingsIcon />,
    active: true,
  },
]

export { NAV_ITEMS, AGE_VERIFICATION_KEY }
