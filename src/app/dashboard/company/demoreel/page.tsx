'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import UploadType from '../../gallery/create/_components/upload-type'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMemo, useState } from 'react'
import { FormCard } from '@/components/custom/form'

const videoDomains = ['youtube.com/watch?v=', 'vimeo.com', 'youtu.be']

export default function DemoReelPage () {
  const [videoUrl, setVideoUrl] = useState('')
  const showFrame = useMemo(() => {
    return videoDomains.some(domain => videoUrl.includes(domain))
  }, [videoUrl])
  return (
    <FormCard heading='DemoReel' subHeading='Add your Demo Reel / Show Reel'>
      <div className='p-4 flex flex-col justify-start gap-4 items-stretch'>
        {showFrame && <iframe src={videoUrl} className='w-full aspect-video' />}
        {showFrame && (
          <div className='space-y-2'>
            <p>Caption/Title</p>
            <Input />
          </div>
        )}
        <div className='space-y-2'>
          <p className='text-sm'>Paste a YouTube or Vimeo video URL here</p>
          <Input
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
            placeholder='Example: https://www.youtube.com/watch?v=doPV-Shqm7k'
            className='placeholder:text-gray-500'
          />
        </div>
        <Button className='ml-auto'>Save</Button>
      </div>
    </FormCard>
  )
}
