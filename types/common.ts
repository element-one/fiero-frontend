type JSONArray = Array<JSONValue>

type JSONValue = string | number | boolean | JSONObject | JSONArray

export interface JSONObject {
  [x: string]: JSONValue
}

export interface Answers {
  [x: string]: string[]
}

export enum WalletType {
  METAMASK = 'metamask',
  WALLET_CONNECT = 'wallet-connect',
}

export type EarnType = 'all' | 'social' | 'survey'

export const getImgIcon = (earnType: string, socialType?: string): string => {
  let imgIcon = ''
  if (earnType === 'social') {
    if (
      socialType === 'twitter_follow' ||
      socialType === 'twitter_like' ||
      socialType === 'twitter_retweet'
    ) {
      imgIcon = '/img/twitter.svg'
    } else if (
      socialType === 'instagram_follow' ||
      socialType === 'instagram_post'
    ) {
      imgIcon = '/img/ic_instagram.svg'
    } else if (socialType === 'tiktok_follow' || socialType === 'tiktok_post') {
      imgIcon = '/svg/tiktok.svg'
    }
  } else if (earnType === 'survey') {
    imgIcon = '/svg/survey_success.svg'
  } else if (earnType === 'referral') {
    imgIcon = '/img/referral.svg'
  } else if (earnType === 'reading') {
    imgIcon = '/img/reading.svg'
  } else if (earnType === 'receipt') {
    imgIcon = '/png/sign_up_success.png'
  }
  return imgIcon
}
