'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { FieldsContainer, FormCard } from '@/components/custom/form'
import { Button } from '@/components/ui/button'
import { useDropzone } from 'react-dropzone'
import pdf from '../../../../../public/images/pdf.png'
import Image from 'next/image'

export default function ResumePage () {
  const resumeDropZone = useDropzone({ multiple: false })
  return (
    <FormCard heading='Resume' subHeading='Upload your resume, 20 Mb max.'>
      <FieldsContainer className='w-full px-5 grid grid-cols-2 gap-2'>
        <input
          id='resime-uploader'
          type='file'
          hidden
          accept='application/pdf'
          {...resumeDropZone.getInputProps()}
        />
        <div
          className='col-span-2 flex flex-col justify-center items-center border border-dashed 
          h-[200px] gap-4'
          {...resumeDropZone.getRootProps()}
        >
          <Button variant={'outline'}>
            <MaterialSymbolIcon className='mr-2'>
              upload_file
            </MaterialSymbolIcon>
            <span>Upload PDF File</span>
          </Button>
          <p className='text-sm opacity-70'>or drag and drop here</p>
        </div>
        <div className='col-span-2 grid gap-2 py-3'>
          {Array.from({ length: 1 }, (_, i) => i).map(i => (
            <div key={i} className='flex justify-start items-center gap-3'>
              <Image src={pdf.src} height={30} width={30} alt='pdf' />
              <div className='flex justify-between items-center w-full'>
                <span className='text-sm'>View Resume</span>
                <div className='flex justify-start items-center gap-1 pr-5 cursor-pointer'>
                  <MaterialSymbolIcon className='opacity-100'>
                    delete
                  </MaterialSymbolIcon>
                  <span className='text-sm'>Delete</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FieldsContainer>
    </FormCard>
  )
}
