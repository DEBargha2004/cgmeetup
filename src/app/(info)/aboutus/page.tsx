import { ArticleContainer, MainContainer } from '../_components/container'
import { Header, Paragraph } from '../_components/font'

export default function AboutUsPage () {
  return (
    <MainContainer>
      <Header className='text-center'>About Us</Header>
      <ArticleContainer>
        <Paragraph className='text-center'>
          CGMeetup was founded in 2011. We built a platform to remove the
          barriers between talent & opportunity.
        </Paragraph>
        <Paragraph>
          The leading online platform to showcase & discover creative work. The
          creative world updates their work in one place to broadcast it widely
          and efficiently. Companies explore the work and access talent on a
          global scale.
        </Paragraph>
        <Paragraph>
          Over the last decade the site has evolved into one of the premier
          games, film, media & entertainment website in the world, offering a
          latest news, an inspirational gallery, jobs, 3d models and hundreds of
          free tutorials on a variety of subjects. We showcases some of the best
          computer graphic artwork in the world.
        </Paragraph>
        <Paragraph>
          We crafting the future of creative workflow. Our talented team of
          designers and developers work hand-in-hand, leveraging the latest
          technologies and design thinking to create revolutionary products that
          connect and empower the creative world. Our mission is to help artists
          and to be a positive force in the media & entertainment arts industry.
        </Paragraph>
      </ArticleContainer>
    </MainContainer>
  )
}
