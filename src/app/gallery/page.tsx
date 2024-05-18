'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Grid, Minus, Plus, Search } from 'lucide-react'
import projects from '../../../public/data/projects.json'
import { GalleryImage } from '@/components/custom/gallery'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function GalleryPage () {
  const [showGridTab, setShowGridTab] = useState(false)
  const [imageLimitRows, setImageLimitRows] = useState({
    lowerLimit: 4,
    upperLimit: 8,
    current: 8,
    changeAmount: 2
  })
  const handleChangeImageCount = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      if (imageLimitRows.current < imageLimitRows.upperLimit) {
        setImageLimitRows({
          ...imageLimitRows,
          current: imageLimitRows.current + imageLimitRows.changeAmount
        })
      }
    } else if (type === 'decrease') {
      if (imageLimitRows.current > imageLimitRows.lowerLimit) {
        setImageLimitRows({
          ...imageLimitRows,
          current: imageLimitRows.current - imageLimitRows.changeAmount
        })
      }
    }
  }
  return (
    <section className='py-10'>
      <div className='my-12 flex flex-col justify-between items-center gap-12 text-center'>
        <div className='space-y-4'>
          <h1 className='text-[52px] font-bold'>
            Showcase & Discover Creative Work
          </h1>
          <p className='text-xl'>
            for Concept Art , Visual Effects , Short Films and more.
          </p>
        </div>
        <div className='w-2/5 relative'>
          <Input className='pl-10' placeholder='Search' />
          <Search className='absolute left-2 top-1/2 -translate-y-1/2' />
        </div>
        <div>
          <Button className='uppercase'>Post Artwork</Button>
        </div>
      </div>
      <div
        className='grid gap-2 px-4 transition-all'
        style={{
          gridTemplateColumns: `repeat(${imageLimitRows.current}, 1fr)`
        }}
      >
        {projects.data.map((project, index) => (
          <GalleryImage project={project} key={project.id} />
        ))}
      </div>
      <div
        className={cn(`aspect-square rounded-full bg-white fixed bottom-10 left-10 
        shadow-lg cursor-pointer h-14 transition-all duration-300 ${
          showGridTab ? 'w-[132px]' : 'w-14'
        }`)}
      >
        <div
          className={cn(
            `w-full h-full flex justify-center items-center
        text-primary transition-all px-4`,
            showGridTab ? 'gap-2' : 'gap-0'
          )}
        >
          <Minus
            className={cn(
              'grayscale hover:grayscale-0 transition-all',
              showGridTab ? 'w-7 h-7' : 'w-0 h-0'
            )}
            onClick={() => handleChangeImageCount('decrease')}
          />
          <Grid
            className='h-7 w-7'
            onClick={() => setShowGridTab(prev => !prev)}
          />
          <Plus
            className={cn(
              'grayscale hover:grayscale-0 transition-all',
              showGridTab ? 'w-7 h-7' : 'w-0 h-0'
            )}
            onClick={() => handleChangeImageCount('increase')}
          />
        </div>
      </div>
    </section>
  )
}
