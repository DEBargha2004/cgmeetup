import { ArticleContainer, MainContainer } from '../_components/container'
import { Header, Paragraph } from '../_components/font'

export default function ContactUsPage () {
  return (
    <MainContainer className='text-center'>
      <Header>Contact Us</Header>
      <ArticleContainer>
        <Paragraph className='text-xl'>For any query and suggestions</Paragraph>
        <Paragraph> Mail us at info@cgmeetup.com</Paragraph>
      </ArticleContainer>
    </MainContainer>
  )
}
