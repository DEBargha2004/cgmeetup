import {
  JobCard,
  MaterialSymbolIcon,
  ProfileInfoOverView
} from '@/components/custom'
import { ImageCollection } from '@/components/custom/gallery'
import { AboutSectionItemsWrapper } from '@/components/custom/profile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { sample_cateories } from '@/constants/categories'
import { getShortendName } from '@/functions'
import Image from 'next/image'
import pdf_image from '../../../public/images/pdf.png'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function ProfilePage () {
  return (
    <section className='h-full bg-darkAccent'>
      <div className='h-2/5 relative'>
        <Image
          src={
            'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
          }
          alt='back-image'
          height={400}
          width={400}
          className='w-full h-full object-cover'
        />
        <Avatar className='md:h-[200px] md:w-[200px] h-[150px] w-[150px] border-2 border-white absolute left-1/2 top-full -translate-x-1/2 -translate-y-[60%]'>
          <AvatarImage
            src='https://cdna.artstation.com/p/users/avatars/000/078/930/large/99d98b9db85095a32a74190b5b4be7d1.jpg?1669152204'
            alt='profile'
            height={300}
            width={300}
          />
          <AvatarFallback className='text-2xl'>
            {getShortendName('Alibaba Salmon')}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className='mt-[90px] flex flex-col justify-between items-center gap-2'>
        <h1 className='md:text-4xl text-2xl font-bold'>Alibaba Salmon</h1>
        <div className='flex flex-col justify-between items-center gap-[6px]'>
          <p className='text-sm  opacity-60'>3D Animator</p>
          <p className='flex justify-center items-end opacity-60 text-sm'>
            <MaterialSymbolIcon>location_on</MaterialSymbolIcon>&nbsp;
            Florida,USA
          </p>
        </div>
        <div className='flex flex-col justify-between items-center gap-5 w-1/5 min-w-[250px]'>
          <div className='flex justify-between items-center gap-5 w-full'>
            <div className='text-center flex flex-row items-center gap-1'>
              <h1 className='font-bold text-sm'>234</h1>
              <p className='text-sm'>Posts</p>
            </div>
            {/* <Separator orientation='vertical' className='h-[40px] w-[2px]' /> */}
            <div className='text-center flex flex-row items-center gap-1'>
              <h1 className='font-bold text-sm'>234</h1>
              <p className='text-sm'>Followers</p>
            </div>
            {/* <Separator orientation='vertical' className='h-[40px] w-[2px]' /> */}
            <div className='text-center flex flex-row items-center gap-1'>
              <h1 className='font-bold text-sm'>234</h1>
              <p className='text-sm'>Following</p>
            </div>
          </div>
          <div className='flex gap-4 flex-wrap sm:flex-row justify-center'>
            <Button className='border-primary w-[150px]'>Follow</Button>
            <Button variant={'success'} className='border-primary w-[150px]'>
              Message
            </Button>
          </div>
        </div>
      </div>
      <div className='my-5'>
        <Tabs defaultValue='posts'>
          <div className='mx-auto w-full py-0'>
            <TabsList className='w-full bg-lightAccent'>
              <TabsTrigger value='posts' className='flex justify-between gap-1'>
                <MaterialSymbolIcon>panorama</MaterialSymbolIcon>Posts
              </TabsTrigger>
              <TabsTrigger value='jobs' className='flex justify-between gap-1'>
                <MaterialSymbolIcon>work</MaterialSymbolIcon>Jobs
              </TabsTrigger>
              <TabsTrigger value='about' className='flex justify-between gap-1'>
                <MaterialSymbolIcon>person</MaterialSymbolIcon>About
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='posts' className='w-full bg-darkAccent mt-1'>
            <ImageCollection />
          </TabsContent>
          <TabsContent value='jobs' className='bg-darkAccent'>
            <section className='md:w-4/5 grid grid-cols-1 xl:grid-cols-2 gap-2 mx-auto px-2'>
              {Array.from({ length: 4 }).map((_, i) => (
                <JobCard key={i} />
              ))}
            </section>
          </TabsContent>
          <TabsContent value='about' className='md:w-full px-2 bg-darkAccent'>
            <section className='md:w-3/5 mx-auto space-y-10 bg-'>
              <AboutSectionItemsWrapper title='My Bio' className='text-center'>
                Embarking on a journey of boundless creativity within the realm
                of digital art, I'm Cat—a passionate artist dedicated to
                translating my vivid imagination into captivating visual
                experiences. Follow for free giveaways, including images and
                DALL-E prompts! Welcome to Cats Corner Graphics, where
                innovation meets imagination. Here, I curate the latest trends
                in digital art and design, inviting you to join me on this
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
                  <Badge
                    className='text-md border-white border-opacity-65'
                    key={i}
                  >
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
                  Twitter<MaterialSymbolIcon>open_in_new</MaterialSymbolIcon>
                </p>
                <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
                  Instagram<MaterialSymbolIcon>open_in_new</MaterialSymbolIcon>
                </p>
                <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
                  Youtube<MaterialSymbolIcon>open_in_new</MaterialSymbolIcon>
                </p>
                <p className='flex justify-center items-center gap-1 cursor-pointer w-full shrink-0'>
                  Website<MaterialSymbolIcon>open_in_new</MaterialSymbolIcon>
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
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
