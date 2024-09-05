import axios from '../axios/client'

export const checkAuth = async () => {
  return axios.get('/auth')
}

export const postSocialVerify = async (socialId: string, code: string) => {
  const { data } = await axios.post('/auth/social/verify', {
    socialId,
    code,
  })
  return data
}

export const postLogin = async (
  email: string,
  referralCode?: string,
  challengeId?: string,
  brand?: string
) => {
  return axios.post('/auth/login', { email, referralCode, challengeId, brand })
}

export const postVerify = async (email: string, otpCode: string) => {
  return axios.post('/auth/verify', { email, otpCode })
}

export const postLogout = async () => {
  return axios.post('/auth/logout')
}
