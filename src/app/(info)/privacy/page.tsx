import { ArticleContainer, MainContainer } from '../_components/container'
import { Header, ListHeader, ListItem, Paragraph } from '../_components/font'

export default function PrivacyPolicyPage () {
  return (
    <MainContainer>
      <Header className='text-center'>Privacy Policy</Header>
      <ArticleContainer>
        <ol className='list-decimal space-y-4 [&>li]:space-y-2'>
          <li>
            <ListHeader>
              We will never share your information with anyone.
            </ListHeader>
            <Paragraph>
              This policy covers how CGMEETUP treats personal information that
              we collect and receive, including information related to your past
              use of CGMEETUP products and services. Personal information is
              information about you that is personally identifiable like your
              name, address, email address, or phone number, and that is not
              otherwise publicly available. This policy does not apply to the
              practices of companies that CGMEETUP does not own or control, or
              to people that CGMEETUP does not employ or manage. In addition,
              certain CGMEETUP services may have their own associated privacy
              statements.
            </Paragraph>
          </li>
          <li>
            <ListHeader>Collecting Information</ListHeader>
            <Paragraph>
              CGMEETUP collects personal information when you register with
              CGMEETUP, when you use CGMEETUP products or services, when you
              visit CGMEETUP pages or the pages of certain CGMEETUP partners,
              and when you enter promotions or sweepstakes. CGMEETUP may combine
              information about you that we have with information we obtain from
              business partners or other companies. When you register we ask for
              information such as your name, email address, occupation, and
              personal interests. Once you register with CGMEETUP and sign in to
              our services, you are not anonymous to us. CGMEETUP automatically
              receives and records information on our server logs from your
              browser, including your IP address, CGMEETUP cookie information,
              and the page you request. CGMEETUP uses information for the
              following general purposes: to customize the advertising and
              content you see, fulfill your requests for products and services,
              improve our services, contact you, conduct research, and provide
              anonymous reporting for internal and external clients.
            </Paragraph>
          </li>
          <li>
            <ListHeader>Cookies & Targeting</ListHeader>
            <Paragraph>
              CGMEETUP may set and access CGMEETUP 'cookies' on your computer.
              CGMEETUP lets other companies that show advertisements on some of
              our pages set and access their cookies on your computer.
              Advertisers or other companies do not have access to CGMEETUP's
              cookies. These third-party advertising companies serve ads when
              you visit our website. These companies may use non-personally
              identifiable information (e.g., click stream information, browser
              type, time and date, subject of advertisements clicked or scrolled
              over - not including your name, address, email address, or
              telephone number) during your visits to this and other Web sites
              in order to provide advertisements about goods and services likely
              to be of greater interest to you. Google, as a third party vendor,
              uses cookies to serve ads on this site. This includes the
              DoubleClick DART cookie which enables it to serve ads to users
              based on their visit to this site and other sites on the Internet.
              You may opt out of the use of the DART cookie by visiting the
              Google ad and content network privacy policy. To learn more about
              this behavioral advertising practice or to opt-out of this type of
              advertising. Notwithstanding any other provision in this policy,
              in visiting this site, a third-party advertiser (or its partners)
              may place or recognize a unique cookie on your browser. These
              cookies enable more customized ads, content or services to be
              provided to you. To trigger these cookies, we may pass an
              encrypted or "hashed" (non-human readable) identifier
              corresponding to your email address to a Web advertising partner,
              who may place a cookie on your computer. No personally
              identifiable information is on, or is connected to, these cookies.
            </Paragraph>
          </li>
          <li>
            <ListHeader>Your Information</ListHeader>
            <Paragraph>
              You can edit your CGMEETUP account information at any time. We
              reserve the right to send you certain communications relating to
              the CGMEETUP service, such as service announcements,
              administrative messages, and newsletters, that are considered part
              of your CGMEETUP account, without offering you the opportunity to
              opt-out of receiving them. You can delete your account by
              contacting CGMEETUP.
            </Paragraph>
          </li>
          <li>
            <ListHeader>Confidentiality and Security</ListHeader>
            <Paragraph>
              We limit access to personal information about you to employees who
              we believe reasonably need to come into contact with that
              information to provide products or services to you or in order to
              do their jobs. We have physical, electronic, and procedural
              safeguards that comply with federal regulations to protect
              personal information about you.
            </Paragraph>
          </li>
          <li>
            <ListHeader>Protecting Your Information</ListHeader>
            <div className='space-y-2'>
              <Paragraph>
                CGMEETUP does not rent, sell, or share personal information
                about you with other people or nonaffiliated companies except to
                provide products or services you've requested, when we have your
                permission, or under the following circumstances:
              </Paragraph>
              <ol className='list-upper-alpha pl-10 marker:text-sm marker:text-[rgba(255,255,255,0.7)]'>
                <li>
                  <Paragraph>
                    We provide the information to trusted partners who work on
                    behalf of or with CGMEETUP under confidentiality agreements.
                    These companies may use your personal information to help
                    CGMEETUP communicate with you about offers from CGMEETUP and
                    our marketing partners. However, these companies do not have
                    any independent right to share this information.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph>
                    We respond to subpoenas, court orders, or legal process, or
                    to establish or exercise our legal rights or defend against
                    legal claims.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph>
                    We believe it is necessary to share information in order to
                    investigate, prevent, or take action regarding illegal
                    activities, suspected fraud, situations involving potential
                    threats to the physical safety of any person, violations of
                    CGMEETUP's terms of use, or as otherwise required by law.
                  </Paragraph>
                </li>
                <li>
                  <Paragraph>
                    We transfer information about you if CGMEETUP is acquired by
                    or merged with another company. In this event, CGMEETUP will
                    notify you before information about you is transferred and
                    becomes subject to a different privacy policy.
                  </Paragraph>
                </li>
              </ol>
            </div>
          </li>
          <li>
            <ListHeader>Policy Updates</ListHeader>
            <Paragraph>
              CGMEETUP may update this policy. We will notify you about
              significant changes in the way we treat personal information by
              sending a notice to the primary email address specified in your
              CGMEETUP account or by placing a prominent notice on our site.
            </Paragraph>
          </li>
        </ol>
      </ArticleContainer>
    </MainContainer>
  )
}
