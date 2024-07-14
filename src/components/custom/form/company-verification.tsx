'use client'

import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import MaterialSymbolIcon from '../material-symbol-icon'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import pdf from '../../../../public/images/pdf.png'
import { CheckCircle, RemoveRedEye, Upload } from '@mui/icons-material'

type FileInfo = {
  name: string
  url: string
  size: number
}

export default function CompanyVerificationForm () {
  const [selectedDoc, setSelectedDoc] = useState<FileInfo | null>(null)
  return (
    <>
      <VerificationForm
        heading='Verify with your Work Email'
        description={`You may be verified faster if you use your work email address 
          associated with your company's website domain.@new Note: Please check the email 
          domain and website domain matches with the company's official name. If the name 
          do not match, it might not pass the verification process.`}
        handleFileChange={file => setSelectedDoc(file)}
      />
      <p className='text-center'>OR</p>
      <VerificationForm
        heading='Verify by Authorized Document'
        description="Note: Please check the email domain and website domain matches 
          with the company's official name. If the name do not match, it might not pass 
          the verification process"
        handleFileChange={file => setSelectedDoc(file)}
      />
      {selectedDoc && (
        <>
          <Link href={selectedDoc.url} target='_blank'>
            <div className='flex justify-start items-center gap-2'>
              <Image src={pdf} alt='pdf' height={30} width={30} />
              <p className='text-sm opacity-70'>{selectedDoc?.name}</p>
              <p className='text-sm '>
                {Math.floor(selectedDoc?.size / 1024)} KB
              </p>
            </div>
          </Link>
          <div className='py-4 flex flex-col justify-center items-center border bg-lightAccent rounded'>
            <Upload className='h-6 text-primary' />
            <p className='text-primary'>Documented Submitted Successfully</p>
          </div>
          <div className='py-4 flex flex-col justify-center items-center border bg-lightAccent rounded'>
            <RemoveRedEye className='h-6 text-yellow-500' />
            <p className='text-yellow-500'>
              Account Status: You Account is under review
            </p>
          </div>
          <div className='py-4 flex flex-col justify-center items-center border bg-lightAccent rounded'>
            <CheckCircle className='h-6 text-success' />
            <p className='text-success'>Verified Successfully</p>
          </div>
        </>
      )}
    </>
  )
}

function VerificationForm ({
  heading,
  description,
  handleFileChange
}: {
  heading: string
  description: string
  handleFileChange?: (file: FileInfo) => void
}) {
  const { getInputProps, getRootProps, acceptedFiles } = useDropzone({
    multiple: false
  })

  useEffect(() => {
    if (acceptedFiles.length) {
      //   reader.readAsDataURL(acceptedFiles[0])

      if (handleFileChange) {
        handleFileChange({
          name: acceptedFiles[0].name,
          url: URL.createObjectURL(acceptedFiles[0]) as string,
          size: acceptedFiles[0].size
        })
      }
    }
  }, [acceptedFiles])
  return (
    <div className='p-3 bg-lightAccent rounded space-y-4'>
      <div className='flex justify-start items-center gap-2'>
        <CheckCircle />
        <h1 className='text-lg'>{heading}</h1>
      </div>
      <article className='opacity-70'>
        {description.split('@new').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </article>
      <div className='w-full flex justify-end'>
        <input
          type='file'
          accept='pdf'
          {...getInputProps()}
          className='hidden'
        />
        <Button className='' {...getRootProps()}>
          Choose
        </Button>
      </div>
    </div>
  )
}
