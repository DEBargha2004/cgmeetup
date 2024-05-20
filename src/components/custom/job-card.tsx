import Image from 'next/image'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Bookmark, Briefcase, Globe, MapPin, Plane } from 'lucide-react'

export default function JobCard () {
  return (
    <Card
      className='bg-lightAccent grid grid-cols-4 gap-x-3 gap-y-2 w-full
    p-3'
    >
      <div className='col-span-4 flex gap-2'>
        <Image
          src={
            'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
          }
          height={100}
          width={100}
          alt='job-image'
          className='md:h-[150px] md:w-[150px] h-[100px] w-[100px] object-cover rounded-lg'
        />
        <div className='space-y-2 w-full'>
          <div className='text-lg md:text-xl font-semibold flex justify-between items-center'>
            <h1>Team Lead Animator [FAR CRY Project]</h1>
            <Bookmark />
          </div>
          <p>Ubisoft Toronto</p>
          <p className='text-sm'>3 - 5 Years / USD $50 - 59</p>
          <div className='sm:flex flex-wrap gap-3 hidden'>
            <Badge>
              <Globe className='mr-2 h-5 w-5' />
              Remote
            </Badge>
            <Badge>
              <Briefcase className='mr-2 h-5 w-5' />
              Permanent
            </Badge>
            <Badge>
              <Plane className='mr-2 h-5 w-5' />
              Relocation Asssistance
            </Badge>
            <Badge>
              <MapPin className='mr-2 h-5 w-5' />
              Montreal, Canada
            </Badge>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-3 sm:hidden col-span-4'>
        <Badge>
          <Globe className='mr-2 h-5 w-5' />
          Remote
        </Badge>
        <Badge>
          <Briefcase className='mr-2 h-5 w-5' />
          Permanent
        </Badge>
        <Badge>
          <Plane className='mr-2 h-5 w-5' />
          Relocation Asssistance
        </Badge>
        <Badge>
          <MapPin className='mr-2 h-5 w-5' />
          Montreal, Canada
        </Badge>
      </div>
      <div className=' flex flex-col justify-between items-end col-span-4'>
        <p className='xl:whitespace-nowrap text-muted-foreground text-xs'>
          3 days ago
        </p>
      </div>
    </Card>
  )
}
