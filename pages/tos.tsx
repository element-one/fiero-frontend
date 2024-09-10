import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Transition } from '@headlessui/react'

import LandingFooter from '@components/Landing/Footer'
import LandingHeader from '@components/Landing/Header'
import { Text } from '@components/Text'

const BrandsPage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  setTimeout(() => {
    setIsOpen(true)
  }, 100)
  return (
    <div className='min-h-screen bg-bg-white'>
      <div className='container mx-auto bg-bg-white pb-10'>
        <LandingHeader />

        <div className='flex h-[138px] w-full items-center justify-center px-9 text-center text-[18px] font-semibold  text-text-primary md:text-[42px]'>
          Fiero Rewards Terms and Conditions
        </div>

        <Transition
          appear={true}
          show={isOpen}
          enter='transition-transform duration-12000 ease-linear'
          enterFrom='translate-y-full'
          enterTo='translate-y-0'
        >
          <div className='mx-7 mt-7 text-text-black ease-linear md:mt-14'>
            <div className='m-auto max-w-[1200px] text-left font-sans text-[14px] leading-6'>
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                Updated: 09/01/2024
              </Text>
              <br />
              <Text variant='b1' className='text-[14px] text-text-black'>
                These Terms and Conditions (collectively, the “Terms”) govern all access to and
                participation in the Community Program (the “Program”), a promotional program
                for Fiero Tequila by GlassDAO Corporation (“we” and “us”), and offered to our
                customers who register for the Program (each, a “Member” or “you”). Please read
                these Terms carefully. If you do not agree to these Terms, please do not
                participate in the Program.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                PLEASE NOTE THAT ANY DISPUTE OR CLAIM RELATED TO THESE TERMS OR
                ARISING OUT OF YOUR ACCESS TO OR PARTICIPATION IN THE PROGRAM MUST
                BE RESOLVED BY ARBITRATION ON AN INDIVIDUAL BASIS, AND MAY NOT BE
                ARBITRATED OR OTHERWISE PURSUED AS A CLASS ACTION. PLEASE SEE
                SECTION 9 BELOW.
              </Text>
              <br />
              <Text variant='b1' className='text-[14px] text-text-black'>
                We reserve the right to modify these Terms from time to time without notice to
                you, by posting a revised version of the Terms on this page. Any changes will be
                effective prospectively as of the date noted in the upper left-hand corner when
                the updated Terms are posted. It is your responsibility to review the Terms
                periodically to be aware of any such changes.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                1. Member Eligibility.
              </Text>
              <br />
              <ul className='list-disc pl-12'>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    You must be an individual and 21 years of age or older to be eligible to
                    participate in the Program as a Member. Corporations, charities, associations
                    or other entities may not be Members
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    No purchase or payment of any kind is needed to participate in the Program as
                    a member.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    You must be a resident of one of the 50 United States or the District of
                    Columbia.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    You may not be an alcohol beverage distributor, wholesaler, importer or retail
                    licensee or an officer, director, employee contractor or agent of such a
                    licensee; a director, officer, employee, contractor or agent of Glass, or any of
                    its affiliates or subsidiaries.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Employees, contractors, directors, officers, and agents of Hotaling & Co., and
                    its affiliates and subsidiaries, advertising and promotion agencies, wholesale
                    distributors, retail licensees, all other service or governmental agencies and
                    their employees involved with the Services, and members of their immediate
                    families (spouse, parent, child, or sibling; whether biological, adopted, step, or
                    in-law) or households (whether related or not) are not eligible to participate.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    There is no fee to sign up for the Program and no purchase is required to earn
                    points and Rewards under the Program (but, as set forth below, qualifying
                    activities are required in order to earn points and Rewards under the Program).
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    To become a Member, visit fierotequilarewards.com/signup and provide the
                    required information. By enrolling you represent that the information you
                    provide is accurate and up to date.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Membership is limited to one membership per individual and per one email
                    address.
                  </Text>
                </li>
              </ul>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                2. Earning Points.
              </Text>
              <br />
              <ol className='list-disc pl-12'>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    You will earn points in the Program by participating in the following activities:
                  </Text>
                  <li>
                    <Text variant='ls' className='text-text-black'>
                      Responding to polls and surveys (50–250 points); sharing content on social
                      channels (250–500 points); referring new members to the Program (200-500
                      points). The Program may make additional earning opportunities available in
                      the future and will update these Terms accordingly. These activities will be
                      offered by Glass as well as participating suppliers in our network.
                    </Text>
                  </li>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Additional points may be made available through special promotional offers
                    (such as social media related offers), which will be subject to any additional
                    terms and conditions set forth in the promotional offer.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Points in your account may not be transferred to other Program Members.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Points under the Program have no cash value.
                  </Text>
                </li>
              </ol>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                3. Points Expiration.
              </Text>
              <br />
              <ol className='list-disc pl-12'>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    All points in your account will expire if you do not engage in a qualifying
                    activity within 365 days of the date of your last activity.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    In addition, all points in your account will immediately expire if we revoke your
                    Membership, in our sole discretion.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Points obtained through special promotional offers may have accelerated
                    expiration schedules or other additional limitations. Any such limitations will be
                    described in the special promotional offer.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Any points added to your account through any computer virus, bug,
                    tampering, intervention, fraud, or technological failure, or due to any other
                    unauthorized compromise of the Program, may be deleted by us in our sole
                    discretion.
                  </Text>
                </li>
              </ol>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                4. Rewards.
              </Text>
              <br />
              <ol className='list-disc pl-12'>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Points can be redeemed for rewards that will be offered by Fiero Tequila,
                    GLASS, as well as participating suppliers in our network. For the points that
                    you earn in the Program, you will be able to redeem those points for non-transferable rewards, including merchandise, digital items, event tickets, or
                    discount or free shipping codes, and such points will be deducted from your
                    point balance. We will send you an email to your registered email address
                    when each Reward is issued to you.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Points will generally show up in your account and become redeemable within
                    one (1) business day after the points are earned. Rewards will generally show
                    up in your account within one (1) business day after the points are redeemed.
                    Certain rewards may be in the form of personalized codes that you may
                    redeem on third-party sites in order to access free shipping or other benefits.
                    In such cases, details about code usage will be included in the Reward
                    description on the Glass site, as well as in the email sent to your registered
                    email address when the Reward is issued to you.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' size='bold' className='text-text-black'>
                    Each Reward will expire 90 days after the date of issuance.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Rewards are not transferable. Rewards issued to you may only be redeemed
                    by you.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    There is no limit on the number of Rewards that you may redeem.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    We reserve the right, in our sole discretion, and on a prospective basis only, to
                    modify the Rewards we issue under the Program, or to substitute alternative
                    rewards of comparable value, at any time and without notice.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    No cash back will be paid on any Reward (unless otherwise required by law).
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    From time to time, we may offer special promotional rewards. These special
                    rewards may be only available in certain areas and may have different
                    expiration periods or other terms than the standard Rewards issued under the
                    Program.
                  </Text>
                </li>
              </ol>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                5. Termination of the Program.
              </Text>
              <br />
              <ol className='list-disc pl-12'>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    We reserve the right to terminate the Program at any time and without notice
                    to you, in our sole discretion.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    If the Program is terminated, you have the option to email cheers@glass.fun to
                    redeem any remaining points in your account for rewards commensurate to
                    the value of your remaining points, which may include Glass company
                    merchandise. Such rewards will be issued within 90 days after the Program
                    termination date, and will expire ninety (90) business days after the date of
                    issuance.
                  </Text>
                </li>
              </ol>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                6. Marketing Communications.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                <span className='font-bold'>6.1 Email Messages: </span>
                When you enroll in the Program, you are required to provide
                us with your email address (along with other information, such as your address,
                phone number, and proof of age), which we will use to send you information about
                the Program (including periodic updates about the Program), as well as to send
                you promotional announcements and other marketing messages and information
                (including special offers) from time to time. You may update this information at any
                time by logging into your account at www.glass.fun. You may opt out of receiving
                marketing emails from us at any time by following the opt-out mechanism in any
                marketing email you may receive from us. If you opt out, you authorize us, our
                subsidiaries and other affiliates, and our third-party contractors to send you an
                email confirming your opt-out. Please note that even if you opt out of our email
                marketing distribution list, we will still be authorized to send you transactional
                email messages about your account or account status and to issue you
                Rewards.******
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                <span className='font-bold'>6.2 Text Messages: </span>
                If any text messaging is offered by us in connection with the
                Program, you may elect, in your sole discretion, to receive (or to decline to
                receive) such text messages from us. By agreeing to receive such text messages,
                you authorize us, our subsidiaries and other affiliates, and third-party contractors
                to send you text messages, to the mobile phone number that you designate,
                Fiero ToS 5
                regarding the Program and other topics of interest. These may include pre-recorded or autodialed and promotional messages. Standard text message service
                charges apply. You are not required to agree to receive text messages to
                participate in the Program. You can unsubscribe to any text messaging service
                that may be offered by us by texting “Stop” to us at any time. If you unsubscribe,
                you understand that we may send you one last text confirming our receipt of your
                request. No purchase is necessary to opt in to receiving text messages.
              </Text>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                7. Applicable Law.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                Any dispute, claim, or cause of action arising from this Program or these Terms
                (“Dispute”) shall be governed by and construed in accordance with the laws of the
                State of California, without giving effect or regard to any principles or doctrines of
                conflicts of law.
              </Text>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                8. Dispute Resolution; Class Action Waiver.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                YOU SHOULD REVIEW THIS PROVISION CAREFULLY. TO THE EXTENT
                PERMITTED BY APPLICABLE LAW, YOU ARE GIVING UP YOUR RIGHT TO GO TO
                COURT TO ASSERT OR DEFEND YOUR RIGHTS EXCEPT FOR MATTERS THAT
                YOU FILE IN SMALL CLAIMS COURT IN THE STATE OR MUNICIPALITY OF YOUR
                RESIDENCE WITHIN THE JURISDICTIONAL LIMITS OF THE SMALL CLAIMS
                COURT AND AS LONG AS SUCH MATTER IS ONLY PENDING IN THAT COURT.
                YOUR RIGHTS WILL BE DETERMINED BY A NEUTRAL ARBITRATOR AND NOT A
                JUDGE OR JURY. YOU ARE ENTITLED TO A FAIR HEARING, BUT THE
                ARBITRATION PROCEDURES MAY BE SIMPLER AND MORE LIMITED THAN
                RULES APPLICABLE IN COURT. AN ARBITRATOR’S DECISION IS AS
                ENFORCEABLE AS ANY COURT ORDER AND IS SUBJECT TO VERY LIMITED
                REVIEW BY A COURT. YOU EXPRESSLY AGREE TO THIS PROVISION AS A
                CONDITION OF PARTICIPATING IN THE PROGRAM.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                8.1 For any Dispute you have with us or the Program, you agree
                to first contact us at{' '}
                <a href='mailto:cheers@glass.fun' className='text-text-primary'>
                  cheers@glass.fun
                </a>{' '}
                and to attempt to resolve such Dispute with us informally.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                8.2 In the unlikely event that we are unable to resolve any Dispute you bring to our
                attention after sixty (60) days, and for any other Dispute we raise, you and we
                agree that, except where prohibited by law, all Disputes shall be resolved
                individually and exclusively by final and binding arbitration administered by the
                American Arbitration Association (“AAA”) and conducted before a single arbitrator,
                all pursuant to the AAA Commercial Arbitration Rules as supplemented by AAA’s
                Fiero ToS 6
                Supplementary Procedures for Consumer-Related Disputes (collectively, the “AAA
                Rules”). For more information on the AAA, the AAA Rules, or the process for filing
                an arbitration claim, you may call the AAA at (800) 778-7879 or visit the AAA
                website at &nbsp;
                <a
                  className='text-text-primary'
                  href='http://www.adr.org'
                  target='_blank'
                >
                  http://www.adr.org
                </a>
                .
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                8.3 You and we agree to the following with respect to the arbitration of any
                Dispute hereunder: (a) ANY CLAIM MUST BE BROUGHT IN YOUR INDIVIDUAL
                CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED
                CLASS OR REPRESENTATIVE PROCEEDING; (b) THE ARBITRATOR MAY NOT
                CONSOLIDATE MORE THAN ONE PERSON’S CLAIMS, MAY NOT OTHERWISE
                PRESIDE OVER ANY FORM OF A REPRESENTATIVE OR CLASS PROCEEDING, AND
                MAY NOT AWARD CLASS-WIDE RELIEF; (c) the arbitration will be held at a
                location in your hometown area unless you and we both agree to another location
                or telephonic arbitration; (d) you will pay any filing fee or other costs of arbitration
                only as required under the AAA Rules or as otherwise specified by the arbitrator;
                (e) we reserve the right, in our sole discretion, to assume responsibility for any or
                all of the costs of the arbitration; (f) the arbitrator will honor claims of privilege and
                privacy recognized at law; (g) the arbitration will be confidential, and neither you
                nor we may disclose the existence, content, or results of any arbitration, except as
                may be required by applicable law or for purposes of enforcement of the
                arbitration award; (h) the arbitrator may award any individual relief or individual
                remedies that are expressly permitted by applicable law; and (i) each party will
                pay its own attorneys’, experts’ and consultants’ fees and expenses, unless there
                is a statutory provision that requires the prevailing party to be paid its fees and
                litigation expenses and the arbitrator awards such attorneys’, experts’ or
                consultants’ fees and expenses to the prevailing party, and, in such instance, the
                fees and costs awarded by the arbitrator will be determined by the applicable law.
                ANY RIGHT TO A TRIAL BY JURY, WHETHER ON AN INDIVIDUAL OR A CLASS
                BASIS, IS HEREBY WAIVED.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                8.4 This provision will survive termination of the Program or these Terms. With the
                exception of the subpart prohibiting arbitration on a class or collective basis, if any
                part of this arbitration provision is deemed to be invalid, unenforceable, or illegal,
                or otherwise conflicts with the AAA Rules, then the balance of this provision will
                remain in effect and will be construed in accordance with its terms as if the invalid,
                unenforceable, illegal, or conflicting part was not contained herein. If for any
                reason a claim proceeds in court rather than in arbitration, the Dispute will be
                Fiero ToS 7
                exclusively brought in federal court if it has jurisdiction or, if it does not, in a state
                court located in the federal judicial district of your residence.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                9. Disclaimers and Limitations of Liability.
              </Text>
              <br />
              <Text variant='b1' className='text-[14px] text-text-black'>
                9.1 TO THE FULLEST EXTENT PERMITTED UNDER APPLICABLE LAW, THE
                PROGRAM IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT
                WARRANTIES, REPRESENTATIONS OR ENDORSEMENTS OF ANY KIND, AND WE
                DISCLAIMS ALL WARRANTIES OF ANY KIND, EXPRESS, IMPLIED, STATUTORY OR
                OTHERWISE, INCLUDING WITHOUT LIMITATION IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT.
              </Text>
              <br />
              <Text variant='b1' className='text-[14px] text-text-black'>
                9.2 TO THE FULLEST EXTENT PERMITTED UNDER APPLICABLE LAW, GLASS,
                INC. DOES NOT WARRANT THAT THE PROGRAM, OR ANY APPLICATIONS
                THROUGH WHICH THE PROGRAM IS PROVIDED, WILL BE UNINTERRUPTED,
                SECURE, OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE
                PROGRAM OR ANY RELATED APPLICATIONS WILL BE FREE OF VIRUSES OR
                OTHER HARMFUL COMPONENTS, AND WE FURTHER DO NOT MAKE ANY
                REPRESENTATIONS OR WARRANTIES REGARDING THE CONTENT OR OTHER
                INFORMATION IN THE PROGRAM OR ANY RELATED APPLICATIONS IN TERMS OF
                ITS CORRECTNESS, ACCURACY, RELIABILITY, TIMELINESS, OR OTHERWISE.
                Applicable law may not allow the exclusion of implied warranties, so some or all of
                these disclaimers may not apply to you.
              </Text>
              <br />
              <Text variant='b1' className='text-[14px] text-text-black'>
                9.3 TO THE FULLEST EXTENT PERMITTED UNDER APPLICABLE LAW, GLASS,
                INC. (AND ITS SUBSIDIARIES AND OTHER AFFILIATES AND ITS PARTICIPATING
                RETAILERS) SHALL NOT BE LIABLE FOR ANY CONSEQUENTIAL, INCIDENTAL,
                SPECIAL, PUNITIVE, EXEMPLARY, OR INDIRECT DAMAGES, OR ANY LOST
                PROFITS OR LOST REVENUES, RESULTING FROM OR ARISING OUT OF YOUR
                PARTICIPATION IN THE PROGRAM OR ANY OTHER MATTER RELATED TO THE
                PROGRAM, EVEN IF WE OR ONE OF OUR AUTHORIZED REPRESENTATIVE HAS
                BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IF YOU ARE
                DISSATISFIED WITH THE PROGRAM, YOUR SOLE AND EXCLUSIVE REMEDY IS TO
                DISCONTINUE YOUR PARTICIPATION IN THE PROGRAM. Applicable law may not
                allow some or all of this exclusion or limitation of liability for damages, so some of
                these exclusions or limitations may not apply to you.
              </Text>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                10. Privacy.
              </Text>
              <br />
              <Text variant='b1' className='text-[14px] text-text-black'>
                Any personal information collected about you through the Program, including
                without limitation any information about you collected through your engagement
                with the Program, will be governed by our Privacy Policy, available
                at &nbsp;
                <a
                  href='https://fierotequila.com'
                  target='_blank'
                  className='text-text-primary'
                >
                  fierotequila.com
                </a>
                , which is incorporated by this reference into these Terms.
              </Text>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                11. Miscellaneous.
              </Text>
              <br />
              <ol className='list-disc pl-12'>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    All Federal, State or other tax liabilities (if any) arising from your access to or
                    participation in the Program are your responsibility.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Nothing in these Terms will limit us from exercising any legal rights or
                    remedies that we may have.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    These Terms shall be the sole terms of the agreement between you and Glass,
                    Inc. regarding your access to or participation in the Program, except that to
                    the extent you access or use any of our websites, such use shall also be
                    subject to our website terms of use available &nbsp;
                    <a
                      href='https://www.glass.fun'
                      className='text-text-primary'
                      target='_blank'
                    >
                      www.glass.fun
                    </a>
                    .
                  </Text>
                </li>
              </ol>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                12. Contact Us.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                If you have any questions about the Program, you may contact us
                at{' '}
                <a href='mailto:cheers@glass.fun' className='text-text-primary'>
                  cheers@glass.fun
                </a>
                .
              </Text>
              <br />
            </div>
          </div>
        </Transition>
        <LandingFooter />
      </div>
    </div>
  )
}

export default BrandsPage
