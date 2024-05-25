import Image from 'next/image'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Bookmark, Briefcase, Globe, MapPin, Plane } from 'lucide-react'
import MaterialSymbolIcon from './material-symbol-icon'

export default function JobCard () {
  return (
    <Card
      className='bg-lightAccent grid grid-cols-4 gap-x-3 gap-y-2 w-full
    p-3 pb-3 md:pb-3 relative'
    >
      <div className='col-span-4 flex gap-x-4'>
        <Image
          src={
            'https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098'
          }
          height={100}
          width={100}
          alt='job-image'
          className='md:h-[150px] md:w-[150px] h-[100px] w-[100px] object-cover rounded'
        />
        <div className='space-y-2 w-full'>
          <div className='text-lg md:text-xl font-semibold flex justify-between items-center'>
            <h1>Team Lead Animator [FAR CRY Project]</h1>
            <Bookmark />
          </div>
          <p className='text-slate-200 opacity-70'>Ubisoft Toronto</p>
          <p className='text-sm text-slate-200'>3 - 5 Years / USD $50 - 59</p>
          <div className='sm:flex flex-wrap gap-2 hidden w-[90%]'>
            <Badge className='text-slate-300 py-0'>
              <MaterialSymbolIcon className='mr-2'>language</MaterialSymbolIcon>
              Remote
            </Badge>
            <Badge className='text-slate-300 py-0'>
              <MaterialSymbolIcon className='mr-2'>trip</MaterialSymbolIcon>
              Permanent
            </Badge>
            <Badge className='text-slate-300 py-0'>
              <MaterialSymbolIcon className='mr-2'>flight</MaterialSymbolIcon>
              Relocation Asssistance
            </Badge>
            <Badge className='text-slate-300 py-0'>
              <MaterialSymbolIcon className='mr-2'>
                location_on
              </MaterialSymbolIcon>
              Montreal, Canada
            </Badge>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-2 sm:hidden col-span-4'>
        <Badge className='text-slate-300'>
          <Globe className='mr-2 h-5 w-5' />
          Remote
        </Badge>
        <Badge className='text-slate-300'>
          <Briefcase className='mr-2 h-5 w-5' />
          Permanent
        </Badge>
        <Badge className='text-slate-300'>
          <Plane className='mr-2 h-5 w-5' />
          Relocation Asssistance
        </Badge>
        <Badge className='text-slate-300'>
          <MapPin className='mr-2 h-5 w-5' />
          Montreal, Canada
        </Badge>
      </div>
      <div className='absolute bottom-1 right-2 flex flex-col justify-between items-end'>
        <p className='xl:whitespace-nowrap text-muted-foreground text-xs'>
          3 days ago
        </p>
      </div>
    </Card>
  )
}
