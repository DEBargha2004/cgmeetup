import { MaterialSymbolIcon, ProfileInfoOverView } from '@/components/custom'
import { AboutSectionItemsWrapper } from '@/components/custom/profile'
import { Badge } from '@/components/ui/badge'
import { sample_cateories } from '@/constants/categories'
import Image from 'next/image'
import pdf_image from '../../../../public/images/pdf.png'

export default function AboutPage () {
  return (
    <section className='md:w-3/5 mx-auto space-y-10 bg-'>
      <AboutSectionItemsWrapper title='My Bio' className='text-center'>
        Embarking on a journey of boundless creativity within the realm of
        digital art, I'm Cat—a passionate artist dedicated to translating my
        vivid imagination into captivating visual experiences. Follow for free
        giveaways, including images and DALL-E prompts! Welcome to Cats Corner
        Graphics, where innovation meets imagination. Here, I curate the latest
        trends in digital art and design, inviting you to join me on this
        exciting exploration of the visual frontier. Every creation is a
        testament to my commitment to pushing the boundaries of artistic
        innovation.
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Job Preference'
        className='opacity-100 space-y-6'
      >
        <div className='space-y-2 w-full'>
          <h1 className='text-lg text-white'>IT - Fullstack</h1>
          <div className=' opacity-60'>
            <p>Pune</p>
            <p>Full Time</p>
            <p>USD 1200-1500/month</p>
          </div>
        </div>
        <div className='space-y-2 w-full'>
          <h1 className='text-lg text-white'>IT - Fullstack</h1>
          <div className=' opacity-60'>
            <p>Pune</p>
            <p>Full Time</p>
            <p>USD 1200-1500/month</p>
          </div>
        </div>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Work Experience'
        className='opacity-100 space-y-6'
      >
        <div className='space-y-2 w-full'>
          <h1 className='text-lg text-white'>Ubisoft</h1>
          <div className=' opacity-60'>
            <p>3D Artist</p>
            <p>Art Department</p>
            <p>Nov 2022 - Apr 2024</p>
          </div>
        </div>
        <div className='space-y-2 w-full'>
          <h1 className='text-lg text-white'>Epic Games</h1>
          <div className=' opacity-60'>
            <p>Animator</p>
            <p>Graphics Department</p>
            <p>May 2021 - Aug 2022</p>
          </div>
        </div>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Education'
        className='opacity-100 space-y-6'
      >
        <div className='space-y-2 w-full'>
          <h1 className='text-lg text-white'>MIT</h1>
          <div className=' opacity-60'>
            <p>PHD</p>
            <p>Art Department</p>
            <p>Nov 2022 - Apr 2024</p>
          </div>
        </div>
        <div className='space-y-2 w-full'>
          <h1 className='text-lg text-white'>Great Lakes</h1>
          <div className=' opacity-60'>
            <p>Geaduation/Diploma</p>
            <p>Graphics Department</p>
            <p>May 2021 - Aug 2022</p>
          </div>
        </div>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Skills'
        className='flex gap-3 flex-wrap opacity-100'
      >
        {sample_cateories.map((category, i) => (
          <Badge className='text-md border-white border-opacity-65' key={i}>
            {category}
          </Badge>
        ))}
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper title='Resume' className='opacity-100'>
        <div className='flex justify-start items-center gap-5'>
          <Image src={pdf_image} alt='pdf' height={50} width={50} />
          <p className='opacity-60 hover:opacity-100 transition-all cursor-pointer'>
            View Resume
          </p>
          <p className='opacity-60 hover:opacity-100 transition-all cursor-pointer'>
            Download Resume
          </p>
        </div>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Work Experience'
        className='opacity-100 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4 w-full '
      >
        <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
          Twitter
          <MaterialSymbolIcon>open_in_new</MaterialSymbolIcon>
        </p>
        <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
          Instagram
          <MaterialSymbolIcon>open_in_new</MaterialSymbolIcon>
        </p>
        <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
          Youtube
          <MaterialSymbolIcon>open_in_new</MaterialSymbolIcon>
        </p>
        <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
          Website
          <MaterialSymbolIcon>open_in_new</MaterialSymbolIcon>
        </p>
      </AboutSectionItemsWrapper>
      <AboutSectionItemsWrapper
        title='Recruiters'
        className='grid grid-cols-2 gap-2'
      >
        <ProfileInfoOverView
          className=''
          image='h-12 w-12'
          heading='md:text-lg'
        />
        <ProfileInfoOverView
          className=''
          image='h-12 w-12'
          heading='md:text-lg'
        />
      </AboutSectionItemsWrapper>
    </section>
  )
}
