import moment from 'moment'

import { ApiUser, ApiUserSocial } from '@type/api'

export const getAddressLabel = (addr: string, num = 4) =>
  `${addr.substring(0, num)}...${addr.substring(addr.length - num)}`

export const getEmailName = (email: string) => {
  return email.substring(0, email.indexOf('@'))
}

export const isTwitterVerified = (user?: ApiUser): boolean => {
  if (user?.socials.length === 0) return false

  const twitter = user?.socials.find((social) => social.type === 'twitter')
  if (twitter?.isVerified) return true

  return false
}

export const getUserTwitter = (user?: ApiUser): ApiUserSocial | undefined => {
  if (user?.socials.length === 0) return undefined

  const twitter = user?.socials.find((social) => social.type === 'twitter')
  return twitter
}

export const isInstagramVerified = (user?: ApiUser): boolean => {
  if (user?.socials.length === 0) return false

  const instagram = user?.socials.find((social) => social.type === 'instagram')

  if (isTrue(process.env.NEXT_PUBLIC_INSTAGRAM_ENABLED)) {
    if (instagram?.isVerified && !!instagram?.token) return true
  } else {
    if (instagram?.isVerified) return true
  }

  return false
}

export const getUserInstagram = (user?: ApiUser): ApiUserSocial | undefined => {
  if (user?.socials.length === 0) return undefined

  const instagram = user?.socials.find((social) => social.type === 'instagram')
  return instagram
}

export const formatMemberSince = (date?: string): string => {
  if (!date) return ''
  return moment(date).format('LL')
}

export const formatWalletAddress = (address?: string): string => {
  if (!address) return ''
  return address.slice(0, 4) + '...' + address.slice(-4)
}

export const convertBase64ToBlob = (base64Image: string) => {
  // Split into two parts
  const parts = base64Image.split(';base64,')

  // Hold the content type
  const imageType = parts[0].split(':')[1]

  // Decode Base64 string
  const decodedData = window.atob(parts[1])

  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length)

  // Insert all character code into uInt8Array
  for (let i = 0; i < decodedData.length; ++i) {
    uInt8Array[i] = decodedData.charCodeAt(i)
  }

  // Return BLOB image after conversion
  return new Blob([uInt8Array], { type: imageType })
}

export const findHashtag = (text: string): string => {
  const regexp = /\B\#\w\w+\b/g
  const result = text.match(regexp)
  if (result) {
    return result[0]
  } else {
    return ''
  }
}

export const findMention = (text: string): string => {
  const regexp = /\B\@\w\w+\b/g
  const result = text.match(regexp)
  if (result) {
    return result[0]
  } else {
    return ''
  }
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const isPastDate = (dateStr: string): boolean => {
  const currentDate: Date = new Date()
  const comparisonDate: Date = new Date(dateStr)

  return comparisonDate < currentDate
}

export const findUrls = (text: string): string[] => {
  const urlRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/
  return text.match(urlRegex) || []
}

export const findIndices = (
  text: string,
  substring: string
): { startIndex: number; endIndex: number } | null => {
  const startIndex = text.indexOf(substring)
  if (startIndex === -1) {
    return null // Substring not found
  }
  const endIndex = startIndex + substring.length
  return { startIndex, endIndex }
}

export const isTrue = (value?: string): boolean => value === 'true'

export const getDiffHours = (date?: string | null): string => {
  if (!date) {
    return ''
  }
  const futureTime = new Date(date).getTime()
  const diffTime = futureTime - new Date().getTime()
  if (diffTime <= 0) {
    return ''
  }
  const diffHours = diffTime / 1000 / 60 / 60
  const days = Math.floor(diffHours / 24)
  const hours = Math.ceil(diffHours % 24)
  if (days === 0) {
    return `${hours} hours left`
  }
  return `${days + 1} days left`
}

export const isTiktokVerified = (user?: ApiUser): boolean => {
  if (user?.socials.length === 0) return false

  const tiktok = user?.socials.find((social) => social.type === 'tiktok')

  if (isTrue(process.env.NEXT_PUBLIC_TIKTOK_ENABLED)) {
    if (tiktok?.isVerified && !!tiktok?.token) return true
  } else {
    if (tiktok?.isVerified) return true
  }

  return false
}

export const getUserTiktok = (user?: ApiUser): ApiUserSocial | undefined => {
  if (user?.socials.length === 0) return undefined

  const tiktok = user?.socials.find((social) => social.type === 'tiktok')
  return tiktok
}
