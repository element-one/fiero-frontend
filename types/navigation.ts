export type PageName =
  | 'Home'
  | 'My Profile'
  | 'Challenges'
  | 'Rewards'
  | 'Brands'
  | 'Events'
  | 'About'

type PagePath =
  | '/'
  | '/profile'
  | '/contests'
  | '/prizes'
  | '/brand'
  | '/event'
  | '/about'

export type NavItem = {
  name: PageName
  path: PagePath | string
  icon: React.ReactNode
  active: boolean
}
