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
    <div className='min-h-screen bg-bg-gray-yellow'>
      <div className='container mx-auto bg-bg-gray-yellow pb-10'>
        <LandingHeader />

        <div className='flex h-[138px] w-full items-center justify-center px-9 text-center text-[42px]  font-semibold text-text-primary'>
          Privacy Policy
        </div>

        <Transition
          appear={true}
          show={isOpen}
          enter='transition-transform duration-12000 ease-linear'
          enterFrom='translate-y-full'
          enterTo='translate-y-0'
        >
          <div className='mx-7 mt-7 ease-linear md:mt-14'>
            <div className='m-auto max-w-[1200px] text-left font-sans text-[14px] leading-6 text-text-black'>
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Introduction
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                This Privacy Policy pertains to the Harpoon Rewards website and other services (collectively, the {' '}
                <span className='font-bold'>“Services”</span>) made available to
                you by GlassDAO Corporation (
                <span className='font-bold'>“GLASS”, “we”, “our”, “us”</span>).
                This Privacy Policy is intended to inform our users (“
                <span className='font-bold'>user(s)</span>”, “
                <span className='font-bold'>you</span>”, or “
                <span className='font-bold'>your</span>”) about how we may
                collect and use the personal information that you provide
                through your use of and access to the Services, the manner in
                which we may use such information, how we protect it, and the
                choices available to you regarding our use of your personal
                information.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                We use your data to provide and improve the Services. By using
                the Services, you agree to the collection and use of information
                in accordance with this Privacy Policy.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Information Collection and Use
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                We collect different types of information for various purposes
                to provide you with and improve our Service.
              </Text>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic italic text-text-black'
              >
                Types of Data Collected
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                Personal Data
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                While using the Services, we may ask you to provide us with
                certain information that can be used to contact or identify you
                or otherwise to provide the Services to you (“
                <span className='font-bold'>Personal Data</span>”). Personal
                Data may include, but is not limited to:
              </Text>
              <br />
              <ol className='list-decimal pl-12'>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Name
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Date of Birth
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Zip code
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Email address
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Social media handles
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Phone umber
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Responses to surveys, polls, or other forms completed
                    through the course of using the Services.
                  </Text>
                </li>
              </ol>
              <br />
              <Text variant='ls' className='text-text-black'>
                We may use your Personal Data to contact you with newsletters,
                marketing or promotional materials and other information that
                may be of interest to you. You may opt out of receiving any, or
                all, of these communications from us by following the
                unsubscribe link.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                Usage Data
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                We may also collect information that your browser and/or mobile
                device sends whenever you access or use the Services (“
                <span className='font-bold'>Usage Data</span>”).
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                This Usage Data may include information such as your computer’s
                Internet Protocol address, browser type, browser version, the
                pages of our Service that you visit, the time and date of your
                visit, the time spent on those pages, unique device identifiers
                and other diagnostic data.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                When you access the Services with a mobile device, this Usage
                Data may include information such as the type of mobile device
                you use, your mobile device unique ID, the IP address of your
                mobile device, your mobile operating system, the type of mobile
                Internet browser you use, unique device identifiers and other
                diagnostic data.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                Tracking Cookies Data
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                We use cookies and similar tracking technologies to track the
                activity on the Services.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                Cookies are files with a small amount of data which may include
                an anonymous unique identifier. Cookies are sent to your browser
                from a website and stored on your device. Other tracking
                technologies are also used such as beacons, tags and scripts to
                collect and track information and to help us improve and analyze
                the Services.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                You can instruct your browser to refuse all cookies or to
                indicate when a cookie is being sent. However, if you do not
                accept cookies, you may not be able to use some portions of the
                Services.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                Examples of Cookies we use:
              </Text>
              <br />
              <ol className='list-decimal pl-12 text-text-black'>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    <strong>Session Cookies:</strong> We use Session Cookies to
                    operate the Services.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    <strong>Preference Cookies:</strong> We use Preference
                    Cookies to remember your preferences and various settings.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    <strong>Security Cookies:</strong> We use Security Cookies
                    for security purposes.
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    <strong>Advertising Cookies:</strong> Advertising Cookies
                    are used to serve you with advertisements that may be
                    relevant to you and your interests.
                  </Text>
                </li>
              </ol>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Use of Data
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                We use the collected data for various purposes:
              </Text>
              <br />
              <ol className='list-decimal pl-12'>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    to provide and maintain the Services;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    to notify you about changes to the Services;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    to provide customer support;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    to provide information regarding the availability of
                    Services based on your location;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    to gather analysis or information so that we can improve the
                    Services;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    to monitor the usage of the Services;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    to detect, prevent and address technical issues;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    to fulfill any other express purpose for which you provide
                    it;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    to carry out our obligations and enforce our rights arising
                    from any contracts entered into between you and us;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    to provide you with direct marketing communications;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    to provide you with news, special offers and general
                    information about other goods, services and events which we
                    offer that are similar to those that you have already
                    purchased or inquired about unless you have opted not to
                    receive such information;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    in any other way we may describe when you provide the
                    information;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    for any other purpose with your consent.
                  </Text>
                </li>
              </ol>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Retention of Data
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                We will retain your Personal Data only for as long as is
                necessary for the purposes set out in this Privacy Policy. We
                will retain and use your Personal Data to the extent necessary
                to comply with our legal obligations (for example, if we are
                required to retain your data to comply with applicable laws),
                resolve disputes, and enforce our agreements and policies.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                We will also retain Usage Data for internal analysis purposes.
                Usage Data is generally retained for a shorter period, except
                when this data is used to strengthen the security or to improve
                the functionality of the Services, or we are legally obligated
                to retain this data for longer time periods.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Transfer of Data
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                Your information, including Personal Data, may be transferred to
                – and maintained on – computers located outside of your state,
                province, country or other governmental jurisdiction where the
                data protection laws may differ from those of your jurisdiction.
              </Text>
              <Text variant='ls' className='text-text-black'>
                If you are located outside of the United States and choose to
                provide information to us, please note that we transfer the
                data, including Personal Data, to the United States and process
                it there.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                Your consent to this Privacy Policy followed by your submission
                of such information represents your agreement to that transfer.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                We will take all the steps reasonably necessary to ensure that
                your data is treated securely and in accordance with this
                Privacy Policy and no transfer of your Personal Data will take
                place to an organization or a country unless there are adequate
                controls in place including the security of your data and other
                personal information.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Disclosure of Data
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                We may disclose personal information that we collect, or you
                provide, as follows:
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                Disclosure for Law Enforcement.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                Under certain circumstances, we may be required to disclose your
                Personal Data if required to do so by law or in response to
                valid requests by public authorities.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                Business Transaction.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                If we or our subsidiaries are involved in a merger, acquisition
                or asset sale, your Personal Data may be transferred.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                Other cases. We may disclose your information also:
              </Text>
              <ol className='list-decimal pl-12'>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    to fulfill the purpose for which you provide it, including
                    by sharing your Personal Data with other partners that may
                    provide services requested by you in order for such service
                    providers and partners to contact you, as you have requested
                    as part of the Services;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    for any other purpose disclosed by us when you provide the
                    information;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    with your consent in any other cases;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    if we believe disclosure is necessary or appropriate to
                    protect our rights, property, or safety or the rights,
                    property or safety of our customers or others; and
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    internally to other members based on internal services you
                    agree to the use of.
                  </Text>
                </li>
              </ol>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Sale of Data
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                We may sell personal information that we collect, or you
                provide, with Service Providers.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Security of Data
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                The security of your data is important to us but remember that
                no method of transmission over the Internet or method of
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your Personal Data, we
                cannot guarantee its absolute security.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                CALIFORNIA AND OTHER U.S. STATE PRIVACY RIGHTS
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                Under some U.S. state laws, including the California Consumer
                Privacy Act of 2018 (CCPA) and the California Privacy Rights Act
                (CPRA), residents may have the following rights:
              </Text>
              <br />
              <ol className='list-decimal pl-12'>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Right to Know: The right to request the personal data that
                    we collect, use or disclose and information about our data
                    practices;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Right to Request Deletion: The right to request that we
                    delete the personal data we have collected about you;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Right to Opt-Out of Data Sales and Sharing: The right to
                    restrict the sale or sharing of your personal data we have
                    collected to third parties;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Right to Non-Discrimination: The right to not be
                    discriminated against for exercising any of these rights;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Right to Correct Information: The right to update or correct
                    the personal data that we collect;
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Right to Limit Use or Disclosure of Sensitive Personal
                    Information: The right to limit the use and disclosure of
                    Sensitive Personal Information (as defined under the CPRA);
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Right to Access Information Related to Automated Decision
                    Making: The right to inquire about our logic involved in
                    automated decision-making applied to personal data we
                    collect; and
                  </Text>
                </li>
                <li>
                  <Text variant='ls' className='text-text-black'>
                    Right to Opt-Out of Automated Decision-Making Technology:
                    The right to request your removal from having automated
                    decision-making applied to your personal data that we
                    collect.
                  </Text>
                </li>
              </ol>

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] text-text-black'
              >
                California’s Shine the Light Law.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                California Civil Code Section 1798.83 permits California
                residents to request and obtain a list of what personal
                information (if any) that we disclosed to third parties for
                direct marketing purposes in the preceding calendar year and the
                names and addresses of those third parties. Requests may be made
                only once a year and are free of charge. Under Section 1798.83,
                California residents are entitled to request and obtain such
                information, by e-mailing a request to{' '}
                <a href='mailto:cheers@glass.fun' className='text-text-primary'>
                  cheers@glass.fun
                </a>
                .
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                To exercise your rights, please contact us at cheers@glass.fun.
                Note that these rights are not absolute, are subject to
                exceptions and limitations, and may not be afforded to residents
                of all states.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                Only you or an authorized agent may make a request related to
                your Personal Data. Note that to respond to your requests, we
                must verify your identity and reserve the right to confirm your
                state residency.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Our Policy on “Do Not Track” Signals:
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                Do Not Track is a privacy preference that you can set in your
                browser. We recognize and respond to Do Not Track signals. When
                you have Do Not Track enabled, we may still use Personal Data
                for analytics and measurement purposes or to otherwise provide
                our Service.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Service Providers
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                We may employ third-party companies and individuals to
                facilitate our Service (“Service Providers”), provide the
                Services on our behalf, perform Service-related services or
                assist us in analyzing how the Services are used.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                These third parties have access to your Personal Data only to
                perform these tasks on our behalf and are obligated not to
                disclose or use it for any other purpose.
              </Text>
              <br />
              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Analytics
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                We may use third-party Service Providers to monitor and analyze
                the use of the Services.
              </Text>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Links to Other Sites
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                Our Service may contain links to other sites that are not
                operated by us. If you click a third-party link, you will be
                directed to that third party&apos;s site. We strongly advise you
                to review the Privacy Policy of every site you visit.
              </Text>
              <br />

              <Text variant='ls' className='text-text-black'>
                We have no control over and assume no responsibility for the
                content, privacy policies or practices of any third-party sites
                or services.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                Some content, including advertisements, on the website is
                provided by third-parties, including advertisers, ad networks
                and servers, content providers and application providers. These
                third parties may use cookies alone or in conjunction with web
                beacons or other tracking technologies to collect information
                about you when you use our Service. The information they collect
                may be associated with your personal information or they may
                collect information, including personal information, about your
                online activities over time and across different websites and
                other online services. They may use this information to provide
                you with interest-based (behavioral) advertising or other
                targeted content. We do not control these third parties tracking
                technologies or how they may be used. If you have any questions
                about an advertisement or other targeted content, you should
                contact the responsible provider directly.
              </Text>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Children’s Privacy
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                Our Services are not intended for use by persons under the age
                of 21.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                We do not knowingly collect personally identifiable information
                from persons under 21. If you become aware that a person under
                21 has provided us with Personal Data, please contact us at{' '}
                <a href='mailto:cheers@glass.fun' className='text-text-primary'>
                  cheers@glass.fun
                </a>
                . If we become aware that we have collected Personal Data from a
                person under 21 without verification of parental consent, we
                take steps to remove that information from our servers.
              </Text>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Changes to This Privacy Policy
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                We will let you know via email and/or a prominent notice on our
                Service, prior to the change becoming effective and update
                “effective date” at the top of this Privacy Policy.
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                You are advised to review this Privacy Policy periodically for
                any changes. Changes to this Privacy Policy are effective when
                they are posted on this page.
              </Text>
              <br />

              <Text
                variant='b1'
                size='bold'
                className='text-[14px] italic text-text-black'
              >
                Contact Us
              </Text>
              <br />
              <Text variant='ls' className='text-text-black'>
                If you have any questions about this Privacy Policy, please
                contact us at{' '}
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
