import { LimitText, MaterialSymbolIcon } from '@/components/custom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { sample_cateories } from '@/constants/categories'

const job_summary = [
  {
    title: 'Job Category',
    value: 'IT and Software'
  },
  {
    title: 'Job Category',
    value: 'IT and Software'
  },
  {
    title: 'Job Category',
    value: 'IT and Software'
  },
  {
    title: 'Job Category',
    value: 'IT and Software'
  }
]

export default function JobPage ({
  params: { jobId }
}: {
  params: { jobId: string }
}) {
  return (
    <div className='md:w-4/5 mx-auto p-4 space-y-8'>
      <section className='my-10 flex gap-5'>
        <Avatar className='h-20 w-20'>
          <AvatarImage src='https://cdna.artstation.com/p/users/avatars/000/078/930/large/99d98b9db85095a32a74190b5b4be7d1.jpg?1669152204' />
          <AvatarFallback>HU</AvatarFallback>
        </Avatar>
        <div className='w-full flex flex-col gap-2'>
          <h1 className='text-3xl font-black'>Lead Environment Artist</h1>
          <p className='text-sm'>Ubisoft</p>
        </div>
      </section>
      <section>
        <div className='flex gap-2 items-center '>
          <MaterialSymbolIcon className='text-lg text-white opacity-100'>
            location_on
          </MaterialSymbolIcon>
          <span className='text-lg'>Los Angeles, Singapore</span>
        </div>
        <div>
          <p className='text-lg text-primary'>Rs 3.5 - 4.5 LPA</p>
        </div>
        <div className='flex justify-start gap-2 my-4'>
          <Button variant={'outline'} className='bg-lightAccent'>
            Full Time
          </Button>
          <Button variant={'outline'} className='bg-lightAccent'>
            Onsite
          </Button>
        </div>
      </section>

      <section className='space-y-4'>
        <Card className='' id='job-description'>
          <CardHeader className='text-xl font-semibold'>
            Job Description
          </CardHeader>
          <CardContent className='text-sm sm:text-base'>
            <LimitText limitCount={200}>
              We are a diverse team and experienced team of developers driven by
              a passion for our art, united by our core values and inspired by a
              culture of inclusivity to build amazing games that thrill players
              everywhere. We pursue growth and innovation in an environment of
              safety and trust. Our culture is built on the belief that the more
              varied voices in our collective will strengthen our team and our
              games. We are looking for our next teammate who will raise our bar
              and make us better. What we need: As a Lead Environment Artist at
              31st Union, your passion, knowledge, and experience will be
              integral to growing a team of talented artists and defining the
              look and style of a new generation of player driven experiences.
              Your expertise will be central to bringing our immersive
              landscapes, architecture, props, and natural environments to life.
              Who you are: You are an experienced Environment Artist with strong
              knowledge AAA games and have an attention to detail. You are
              proficient in both Substance Designer and Substance Painter with
              knowledge in developing workflows and leading a team of artist.
              You are on the lookout for next gen tools and practices that
              empower your team and improve efficiency for the project. You
              possess a keen ability to communicate and collaborate across
              disciplines sharing ideas and articulating visions. You are
              inspired by growth and excellence and thrive on sharing your
              knowledge with your teammates while continually honing your craft.
              Iterating, communicating, and creating together is what drives
              your passion for art and games. You are knowledgeable in all the
              tools, techniques, and asset creation pipelines: UE5, Substance
              Designer, Substance Painter, ZBrush, Maya/Blender, Photoshop,
              Jira, Confluence.
            </LimitText>
          </CardContent>
        </Card>
        <Card className='' id='job-skills'>
          <CardHeader className='text-xl font-semibold'>
            Required Skills
          </CardHeader>
          <CardContent className='flex flex-wrap gap-2'>
            {sample_cateories.map(cat => (
              <Badge key={cat} className='bg-darkAccent whitespace-nowrap'>
                {cat}
              </Badge>
            ))}
          </CardContent>
        </Card>
        <Card className=''>
          <CardHeader className='text-xl font-semibold'>Job Summary</CardHeader>
          <CardContent className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            {job_summary.map(({ title, value }, index) => (
              <div key={index} className='space-y-2'>
                <h1 className='sm:text-base text-sm'>{title}</h1>
                <p className='text-xs sm:text-sm text-primary'>{value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className='' id='about'>
          <CardHeader className='text-xl font-semibold'>About</CardHeader>
          <CardContent className='text-sm sm:text-base'>
            Paragraphs are the building blocks of papers. Many students define
            paragraphs in terms of length: a paragraph is a group of at least
            five sentences, a paragraph is half a page long, etc. In reality,
            though, the unity and coherence of ideas among sentences is what
            constitutes a paragraph.
          </CardContent>
        </Card>
      </section>
      <section className='flex justify-center md:justify-end'>
        <Button className='w-4/5 md:w-fit'>Apply</Button>
      </section>
    </div>
  )
}
