import { JSONObject } from './common'

export interface ApiMetaResponse {
  page: number
  take: number
  itemCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface ApiWallet {
  id: string
  address: string
  name: string
  createdAt: string
}

export interface ApiBrand {
  id: string
  name: string
  slug: string
  title: string
  description: string
  imageUrl: string
  iconUrl: string
  bannerUrl: string
  callAction: string
  tokenId: number
  tokenSymbol: string
  createdAt: string
  earns: ApiEarn[]
  rewards: ApiReward[]
}

export interface ApiEarn {
  id: string
  name: string
  description: string
  imageUrl: string
  hasHashtag: boolean
  type: 'social' | 'survey' | 'referral' | 'reading' | 'receipt'
  points: number
  referralCount: number
  createdAt: string
  expiredAt: string | null
  brand: ApiBrand
  badge: ApiBadge
  earnSocial: ApiSocial
  earnSurveys: ApiSurvey[]
  earnReadings: ApiReading[]
  liveAt: string | null
}

export interface ApiEventRewardItem {
  slots: string[]
  createdAt: string
  deletedAt: string
  updatedAt: string
}

export interface ApiEventRewardSpinPrize {
  createdAt: string
  deletedAt: string | null
  used: number
  id: string
  isWinner: boolean
  name: string
  quantity: number
  spinNumber: number
  updatedAt: string
}

export interface ApiEventReward {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  type: 'raffle' | 'merchandise' | 'custom' | 'other' | 'spin'
  points: number
  isComing: boolean
  expiredAt: string | null
  order: number | null
  eventRewardItem?: ApiEventRewardItem
}

export interface ApiEvent {
  id: string
  slug: string
  name: string
  description: string
  type: string
  imageUrl: string
  location: string
  rsvp: string
  headerUrl: string
  isPopular: boolean
  eventAt: string
  order: number
  brandId: string
  createdAt: string
  round: number
  winners: { round: number; userId: string }[]
  eventRewards: ApiEventReward[]
  earns: ApiEarn[]
}
export interface ApiEventResponse {
  statusCode: number
  event: ApiEvent
}
export interface ApiEventsResponse {
  statusCode: number
  data: ApiEvent[]
  meta: ApiMetaResponse
}
export interface ApiReward {
  id: string
  name: string
  description: string
  restriction: string
  states: JSONObject
  imageUrl: string
  type:
    | 'discount'
    | 'merchandise'
    | 'custom'
    | 'other'
    | 'raffle'
    | 'spin'
    | 'qrcode'
  points: number
  createdAt: string
  expiredAt: string | null
  isPopular: boolean
  isHidden: boolean
  isComing: boolean
  brand: ApiBrand
  liveAt: string | null
  spinPrizes: ApiEventRewardSpinPrize[]
  isClaimed?: boolean
}

export interface ApiBadge {
  id: string
  name: string
  description: string
  imageUrl: string
  contractAddress: string
  tokenId: number
  createdAt: string
}

export interface ApiEarnsResponse {
  statusCode: number
  data: ApiEarn[]
  meta: ApiMetaResponse
}

export interface ApiBrandsResponse {
  statusCode: number
  data: ApiBrand[]
  meta: ApiMetaResponse
}

export interface ApiBrandResponse {
  statusCode: number
  brand: ApiBrand
}

export interface ApiUserSocial {
  id: string
  name: string
  socialId: string
  username: string
  firstName: string | null
  lastName: string | null
  type: 'twitter' | 'instagram' | 'tiktok'
  profileImageUrl: string
  isVerified: boolean
  token: string | null
}

export interface ApiSocial {
  id: string
  name: string
  description: string
  tweetId: string
  tweetContent: string
  account: string
  hashtag: string
  createdAt: string
  type:
    | 'twitter_follow'
    | 'twitter_like'
    | 'twitter_retweet'
    | 'instagram_follow'
    | 'instagram_post'
    | 'tiktok_post'
    | 'tiktok_follow'
}

export interface ApiSurveyContent {
  id: string
  name: string
  imageUrl: string
  order: number
}

export interface ApiSurvey {
  id: string
  name: string
  description: string
  isText: boolean
  isQuestion: boolean
  contents: ApiSurveyContent[] | ApiSurveyContent
  createdAt: string
  type: 'single' | 'multiple'
}
export interface ApiReading {
  id: string
  name: string
  description: string
  imageUrl: string
}

export interface ApiUserHolding {
  id: string
  points: number
  createdAt: string
  earn: ApiEarn
  brand: ApiBrand
}

export interface ApiUserEarn {
  id: string
  isPending: boolean
  isCompleted: boolean
  isClaimed: boolean
  isAirdropped: boolean
  answers: JSONObject
  invites: JSONObject
  transaction: string | null
  earn: ApiEarn
  user: ApiUser
}

export interface ApiUserBadge {
  id: string
  isCompleted: boolean
  isClaimed: boolean
  isAirdropped: boolean
  badge: ApiBadge
}

export interface ApiUserReferral {
  id: string
  isAccepted: boolean
  isClaimed: boolean
  isAirdropped: boolean
  isCompleted: boolean
  email: string
  referral?: ApiUser
  referrer?: ApiUser
  points: number
}

export interface ApiUserBonus {
  id: string
  isCompleted: boolean
  isClaimed: boolean
  isAirdropped: boolean
  points: number
}

export interface ApiUser {
  id: string
  userId: string
  name: string | null
  email: string
  firstName: string
  lastName: string
  profileImageUrl: string
  createdAt: string
  socials: ApiUserSocial[]
  badges: ApiUserBadge[]
  holdings: ApiUserHolding[]
  wallets: ApiWallet[]
  referrers: ApiUserReferral[]
  referralCode: string
  bonus: ApiUserBonus
  phoneNumber: string | null
}

export interface ApiUserResponse {
  statusCode: number
  user: ApiUser
}

export interface ApiEarnPayload {
  answers?: string
  email?: string
  id?: string
  caption?: string
  userReceiptId?: string
  postUrl?: string
}

export interface ApiClaimPayload {
  referralId?: string
}

export interface ApiUserEarnResponse {
  statusCode: number
  userEarn: ApiUserEarn
}

export interface ApiMessageResponse {
  statusCode: number
  message: string
}

export interface ApiInstagramPost {
  id: string
  caption: string
  mediaUrl: string
  thumbnailUrl?: string
}

export interface ApiTiktokPost {
  id: string
  caption: string
  mediaUrl: string
  thumbnailUrl?: string
}

export interface ApiUserHoldingsResponse {
  statusCode: number
  holdings: ApiUserHolding[]
}

export interface ApiUserBadgesResponse {
  statusCode: number
  badges: ApiUserBadge[]
}

export interface ApiUserEarnsResponse {
  statusCode: number
  earns: ApiUserEarn[]
}

export interface ApiUserReferralsResponse {
  statusCode: number
  referrals: ApiUserReferral[]
}

export interface ApiRewardsResponse {
  statusCode: number
  data: ApiReward[]
  meta: ApiMetaResponse
}

export interface ApiRewardResponse {
  statusCode: number
  reward: ApiReward
}

export interface ApiRewardDiscount {
  id: string
  code: string
}

export interface ApiRewardDelivery {
  id: string
  firstName: string
  lastName: string
  address: string
  address1: string
  city: string
  state: string
  zipCode: string
}

export interface ApiEventRewardSpin {
  createAt: string
  deleteAt: string | null
  id: string
  isWinner: true
  name: string
  spinNumber: number
  updateAt: string
}

export interface ApiUserReward {
  id: string
  transaction?: string
  user: ApiUser
  reward: ApiReward
  discount?: ApiRewardDiscount
  delivery?: ApiRewardDelivery
  isClaimed?: boolean
  isRedeemed?: boolean
  rewardSpin?: ApiEventRewardSpin
  qrCode?: string
}

export interface ApiUserEventReward {
  id: string
  isClaimed: boolean
  isRedeemed: boolean
  user: ApiUser
  eventReward: ApiEventReward
  qrCode: string
  redeemCount: number
  eventRewardCustom?: ApiEventRewardCustom
  eventRewardSpin?: ApiEventRewardSpin
}

export interface ApiUserRewardResponse {
  statusCode: number
  userReward: ApiUserReward
}

export interface ApiUserRewardsResponse {
  statusCode: number
  rewards: ApiUserReward[]
}

export interface ApiDeliveryPayload {
  firstName: string
  lastName: string
  address: string
  state: string
  city: string
  zipCode: string
}

export interface ApiCustomPayload {
  name: string
  email: string
}

export interface ApiEventRewardCustom {
  id: string
  name: string
  email: string
}

export interface ApiEventRewardCustomPayload {
  name: string
  email: string
}

export interface ApiInstagramProfileResponse {
  statusCode: number
  profile: {
    mediaCount: number
  }
}

export interface ApiTiktokProfileResponse {
  statusCode: number
  profile: {
    mediaCount: number
  }
}

export interface ApiUserEventRewardResponse {
  statusCode: number
  userEventReward: ApiUserEventReward
  count: number
}

export interface ApiUserEventRewardsResponse {
  statusCode: number
  eventRewards: ApiUserEventReward[]
}

export interface ApiEventRaffle {
  id: string
  isWinner: boolean
  event: ApiEvent
  user: ApiUser
  token: number
}

export interface ApiEventRaffleResponse {
  statusCode: number
  eventRaffle: ApiEventRaffle
}

export interface ApiPostRewardSpinResponse {
  statusCode: number
  spinNumber: number
  name: string
  isWinner: boolean
  userReward: ApiUserReward
}
