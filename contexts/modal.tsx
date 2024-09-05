import React, {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

import ClaimRewardsModal from '@components/Modal/Claim/ClaimRewards'
import CustomCongratsModal from '@components/Modal/Custom/CustomCongrats'
import CustomInfoModal from '@components/Modal/Custom/CustomInfo'
import EventCustomCongratsModal from '@components/Modal/Custom/EventCustomCongrats'
import EventCustomInfoModal from '@components/Modal/Custom/EventCustomInfo'
import { DeliveryConfirmModal } from '@components/Modal/Delivery/DeliveryConfirm'
import DeliveryCongratsModal from '@components/Modal/Delivery/DeliveryCongrats'
import DeliveryInfoModal from '@components/Modal/Delivery/DeliveryInfo'
import DeliverySuccessModal from '@components/Modal/Delivery/DeliverySuccess'
import DiscountSuccessModal from '@components/Modal/Discount/DiscountSuccess'
import EventRaffleSuccessModal from '@components/Modal/Event/EventRaffleSuccess'
import {
  BadgeModal,
  ImageCropModal,
  InstagramQuestModal,
  PhoneNumberModal,
  ReferralQuestModal,
  SurveyQuestModal,
  TiktokQuestModal,
  TipModal,
  TwitterQuestModal,
} from '@components/Modal/index'
import InstagramLinkModal from '@components/Modal/Instagram/InstagramLink'
import InstagramReconnectModal from '@components/Modal/Instagram/InstagramReconnect'
import QRCodeSuccessModal from '@components/Modal/QRCode/QRCodeSuccess'
import RaffleModal from '@components/Modal/Raffle/Raffle'
import RaffleSuccessModal from '@components/Modal/Raffle/RaffleSuccess'
import ReadingQuestModal from '@components/Modal/Reading/ReadingQuest'
import ReceiptModal from '@components/Modal/Receipt/ReceiptModal'
import RedeemQRCodeModal from '@components/Modal/Redeem/RedeemQRCode'
import RedeemRewardModal from '@components/Modal/Redeem/RedeemReward'
import RedeemTokenModal from '@components/Modal/Redeem/RedeemToken'
import BonusModal from '@components/Modal/Referral/Bonus'
import ClaimReferralSuccessModal from '@components/Modal/Referral/ClaimReferralSuccessModal'
import PunkModal from '@components/Modal/Sign/Punk'
import SignInModal from '@components/Modal/Sign/SignIn'
import SignInSuccessModal from '@components/Modal/Sign/SignInSuccess'
import SpinModal from '@components/Modal/Spin/Spin'
import SpinClaimedModal from '@components/Modal/Spin/SpinClaimed'
import SpinSuccessModal from '@components/Modal/Spin/SpinSuccess'
import TiktokLinkModal from '@components/Modal/Tiktok/TiktokLink'
import TiktokReconnectModal from '@components/Modal/Tiktok/TiktokReconnect'

export enum ModalType {
  CLOSED = 'closed',
  SIGN_IN_MODAL = 'sign-in-modal',
  TWITTER_CHALLENGE_MODAL = 'twitter-challenge-modal',
  INSTAGRAM_CHALLENGE_MODAL = 'instagram-challenge-modal',
  INSTAGRAM_RECONNECT_MODAL = 'instagram-reconnect-modal',
  INSTAGRAM_LINK_MODAL = 'instagram-link-modal',
  TIKTOK_CHALLENGE_MODAL = 'tiktok-challenge-modal',
  TIKTOK_RECONNECT_MODAL = 'tiktok-reconnect-modal',
  TIKTOK_LINK_MODAL = 'tiktok-link-modal',
  SURVEY_CHALLENGE_MODAL = 'survey-challenge-modal',
  REFERRAL_CHALLENGE_MODAL = 'referral-challenge-modal',
  IMAGE_CROP_MODAL = 'image-crop-modal',
  REDEEM_MODAL = 'redeem-modal',
  REDEEM_QR_CODE_MODAL = 'redeem-qr-code-modal',
  REDEEM_REWARD_MODAL = 'redeem-reward-modal',
  EVENT_RAFFLE_SUCCESS_MODAL = 'event-raffle-success-modal',
  DISCOUNT_SUCCESS_MODAL = 'redeem-success-modal',
  BADGE_MODAL = 'badge-modal',
  BONUS_MODAL = 'bonus-modal',
  TIP_MODAL = 'tip-modal',
  DELIVERY_SUCCESS_MODAL = 'delivery-success-modal',
  DELIVERY_INFO_MODAL = 'delivery-info-modal',
  DELIVERY_CONFIRM_MODAL = 'delivery-confirm-modal',
  DELIVERY_CONGRATS_MODAL = 'delivery-congrats-modal',
  CLAIM_REWARDS_MODAL = 'claim-rewards-modal',
  CUSTOM_INFO_MODAL = 'custom-info-modal',
  CUSTOM_CONGRATS_MODAL = 'custom-congrats-modal',
  EVENT_CUSTOM_INFO_MODAL = 'event-custom-info-modal',
  EVENT_CUSTOM_CONGRATS_MODAL = 'event-custom-congrats-modal',
  READING_CHALLENGE_MODAL = 'reading-challenge-modal',
  PUNK_MODAL = 'punk-modal',
  RECEIPT_MODAL = 'receipt-modal',
  PHONE_NUMBER_MODAL = 'phone-number-modal',
  CLAIM_REFERRAL_SUCCESS_MODAL = 'claim_referral_success_modal',
  SIGN_IN_SUCCESS_MODAL = 'sing_in_success_modal',
  RAFFLE_MODAL = 'raffle_modal',
  RAFFLE_SUCCESS_MODAL = 'raffle_success_modal',
  SPIN_MODAL = 'spin_modal',
  SPIN_SUCCESS_MODAL = 'spin_success_modal',
  SPIN_CLAIMED_MODAL = 'spin_claimed_modal',
  QRCODE_SUCCESS_MODAL = 'qrcode_success_modal',
}

export interface ModalContextProps {
  isModalShown: (modal: ModalType) => boolean
  showModal: (modal: ModalType, isEarn?: boolean) => void
  hideModal: () => void
}

const defaultContext: ModalContextProps = {
  isModalShown: () => false,
  showModal: () => null,
  hideModal: () => null,
}

export const ModalContext = createContext<ModalContextProps>(defaultContext)

export const ModalProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [currentModal, setCurrentModal] = useState<ModalType>(ModalType.CLOSED)

  const isModalShown = useCallback(
    (modal: ModalType) => {
      return modal === currentModal
    },
    [currentModal]
  )

  const showModal = useCallback((modal: ModalType, isEarn?: boolean) => {
    if (modal === ModalType.TIP_MODAL || modal === ModalType.REDEEM_MODAL) {
      setIsEarn(!!isEarn)
    }
    setCurrentModal(modal)
  }, [])

  const hideModal = useCallback(
    () => setCurrentModal(ModalType.CLOSED),
    [setCurrentModal]
  )

  const [isEarn, setIsEarn] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        ...defaultContext,
        isModalShown,
        showModal,
        hideModal,
      }}
    >
      {children}
      {currentModal === ModalType.SIGN_IN_MODAL && <SignInModal />}
      {currentModal === ModalType.TWITTER_CHALLENGE_MODAL && (
        <TwitterQuestModal />
      )}
      {currentModal === ModalType.INSTAGRAM_CHALLENGE_MODAL && (
        <InstagramQuestModal />
      )}
      {currentModal === ModalType.INSTAGRAM_LINK_MODAL && (
        <InstagramLinkModal />
      )}
      {currentModal === ModalType.INSTAGRAM_RECONNECT_MODAL && (
        <InstagramReconnectModal />
      )}
      {currentModal === ModalType.TIKTOK_CHALLENGE_MODAL && (
        <TiktokQuestModal />
      )}
      {currentModal === ModalType.TIKTOK_LINK_MODAL && <TiktokLinkModal />}
      {currentModal === ModalType.TIKTOK_RECONNECT_MODAL && (
        <TiktokReconnectModal />
      )}
      {currentModal === ModalType.SURVEY_CHALLENGE_MODAL && (
        <SurveyQuestModal />
      )}
      {currentModal === ModalType.IMAGE_CROP_MODAL && <ImageCropModal />}
      {currentModal === ModalType.BADGE_MODAL && <BadgeModal />}
      {currentModal === ModalType.REFERRAL_CHALLENGE_MODAL && (
        <ReferralQuestModal />
      )}
      {currentModal === ModalType.TIP_MODAL && <TipModal isEarn={isEarn} />}
      {currentModal === ModalType.REDEEM_MODAL && (
        <RedeemTokenModal isRaffle={isEarn} />
      )}
      {currentModal === ModalType.REDEEM_QR_CODE_MODAL && <RedeemQRCodeModal />}
      {currentModal === ModalType.REDEEM_REWARD_MODAL && <RedeemRewardModal />}
      {currentModal === ModalType.EVENT_RAFFLE_SUCCESS_MODAL && (
        <EventRaffleSuccessModal />
      )}
      {currentModal === ModalType.DISCOUNT_SUCCESS_MODAL && (
        <DiscountSuccessModal />
      )}
      {currentModal === ModalType.BONUS_MODAL && <BonusModal />}
      {currentModal === ModalType.DELIVERY_SUCCESS_MODAL && (
        <DeliverySuccessModal />
      )}
      {currentModal === ModalType.DELIVERY_INFO_MODAL && <DeliveryInfoModal />}
      {currentModal === ModalType.DELIVERY_CONGRATS_MODAL && (
        <DeliveryCongratsModal />
      )}
      {currentModal === ModalType.DELIVERY_CONFIRM_MODAL && (
        <DeliveryConfirmModal />
      )}
      {currentModal === ModalType.CLAIM_REWARDS_MODAL && <ClaimRewardsModal />}
      {currentModal === ModalType.CUSTOM_INFO_MODAL && <CustomInfoModal />}
      {currentModal === ModalType.CUSTOM_CONGRATS_MODAL && (
        <CustomCongratsModal />
      )}
      {currentModal === ModalType.EVENT_CUSTOM_INFO_MODAL && (
        <EventCustomInfoModal />
      )}
      {currentModal === ModalType.EVENT_CUSTOM_CONGRATS_MODAL && (
        <EventCustomCongratsModal />
      )}
      {currentModal === ModalType.READING_CHALLENGE_MODAL && (
        <ReadingQuestModal />
      )}
      {currentModal === ModalType.PUNK_MODAL && <PunkModal />}
      {currentModal === ModalType.RECEIPT_MODAL && <ReceiptModal />}
      {currentModal === ModalType.PHONE_NUMBER_MODAL && <PhoneNumberModal />}
      {currentModal === ModalType.CLAIM_REFERRAL_SUCCESS_MODAL && (
        <ClaimReferralSuccessModal />
      )}
      {currentModal === ModalType.SIGN_IN_SUCCESS_MODAL && (
        <SignInSuccessModal />
      )}
      {currentModal === ModalType.RAFFLE_MODAL && <RaffleModal />}
      {currentModal === ModalType.RAFFLE_SUCCESS_MODAL && (
        <RaffleSuccessModal />
      )}
      {currentModal === ModalType.SPIN_MODAL && <SpinModal />}
      {currentModal === ModalType.SPIN_SUCCESS_MODAL && <SpinSuccessModal />}
      {currentModal === ModalType.SPIN_CLAIMED_MODAL && <SpinClaimedModal />}
      {currentModal === ModalType.QRCODE_SUCCESS_MODAL && (
        <QRCodeSuccessModal />
      )}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
