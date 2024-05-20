import Image from 'next/image'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Bookmark, Briefcase, Globe, MapPin, Plane } from 'lucide-react'

export default function JobCard () {
  return (
    <Card
      className='bg-lightAccent flex items-stretch justify-between gap-4 w-full
    p-3'
    >
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
        <h1 className='text-lg md:text-xl font-semibold'>
          Team Lead Animator [FAR CRY Project]
        </h1>
        <p>Ubisoft Toronto</p>
        <p className='text-sm'>3 - 5 Years / USD $50 - 59</p>
        <div className='md:w-1/2 flex flex-wrap gap-3'>
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
      <div className=' flex flex-col justify-between items-end'>
        <Bookmark />
        <p className='xl:whitespace-nowrap text-muted-foreground text-sm'>
          Posted 3 days ago
        </p>
      </div>
    </Card>
  )
}
