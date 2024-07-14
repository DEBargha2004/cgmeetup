'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Cropper, MaterialSymbolIcon } from '@/components/custom'
import { sample_cateories } from '@/constants/categories'
import {
  HTMLProps,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { FieldType } from '@/types/field-type'
import { RichTextEditor } from '@/components/custom/editor'
import { tags } from '@/constants/job-filters'
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select'
import { ReactCropperElement } from 'react-cropper'
import {
  Rocket,
  Image as ImageIcon,
  Crop,
  Upload,
  Delete
} from '@mui/icons-material'

const visibilityOptions: FieldType[] = [
  {
    label: 'Public',
    value: 'public'
  },
  {
    label: 'Private',
    value: 'private'
  }
]

export default function Dashboard () {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedVisibility, setSelectedVisibility] = useState(
    visibilityOptions[0]
  )
  const [images, setImages] = useState<
    { id: string; url: string; type: string; caption: string }[]
  >([])
  const [thumbnail, setThumbnail] = useState<{
    id: string
    url: string
    type: string
    caption: string
    custom: boolean
    crop: boolean
  } | null>()
  const videoDomains = ['youtube.com/watch?v=', 'vimeo.com']
  const [videoUrl, setVideoUrl] = useState('')
  const showFrame = useMemo(() => {
    return videoDomains.some(domain => videoUrl.includes(domain))
  }, [videoUrl])

  const thumbnailDropzone = useDropzone()
  const mainFeedDropzone = useDropzone()

  const thumbnailRef = useRef<HTMLInputElement>(null)
  const cropperRef = useRef<ReactCropperElement>(null)
  const mainUploaderRef = useRef<HTMLInputElement>(null)

  // const onDragEnd = e => {}

  const handleCustomThumbnailChange = (files: File[] | null) => {
    if (files?.length) {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])

      reader.onloadend = () => {
        setThumbnail({
          id: crypto.randomUUID(),
          url: reader.result as string,
          type: files[0].type,
          caption: '',
          custom: true,
          crop: false
        })
      }
    }
  }

  const handleCrop = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      //@ts-ignore
      setThumbnail(prev => ({
        ...prev,
        url: cropperRef.current?.cropper
          .getCroppedCanvas()
          .toDataURL() as string
      }))
    }
  }

  useEffect(() => {
    handleCustomThumbnailChange(thumbnailDropzone.acceptedFiles)
  }, [thumbnailDropzone.acceptedFiles])

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex flex-col sm:gap-4 sm:py-4'>
        <header
          className=' flex z-40 lg:h-14 items-center gap-4 border-b px-4 sm:h-auto 
        sm:border-0 sm:bg-darkAccent sm:px-6'
        >
          <Breadcrumb className='hidden md:flex'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>News</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
          <div className=' grid flex-1 auto-rows-max gap-4'>
            <div className='flex items-center gap-4'>
              <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
                Add News Post
              </h1>
              <Badge>{selectedVisibility.label}</Badge>
            </div>
            <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
              <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
                <Card
                  x-chunk='dashboard-07-chunk-1'
                  className='border bg-card p-2 max-w-full overflow-hidden'
                >
                  <CardContent className='flex flex-col justify-between items-stretch gap-1 p-0 w-full '>
                    <div className='space-y-2'>
                      <p className='text-sm'>Title</p>
                      <Input className='' placeholder='Post Title' />
                    </div>
                    <RichTextEditor />
                  </CardContent>
                </Card>
                <Card
                  x-chunk='dashboard-07-chunk-1'
                  className='border bg-card p-2 max-w-full'
                >
                  <CardContent className='flex flex-col justify-between items-stretch gap-4 p-0 w-full '>
                    <div className='space-y-2'>
                      <p className='text-sm'>Category</p>

                      <FancyMultiSelect
                        options={sample_cateories.map(cat => ({
                          label: cat,
                          value: cat
                        }))}
                        placeholder='Select Category'
                      />
                    </div>
                    <div className='space-y-2'>
                      <p className='text-sm'>Tags</p>
                      <FancyMultiSelect
                        options={tags.map(tag => ({ label: tag, value: tag }))}
                        placeholder='Select Tags'
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
                <Card
                  x-chunk='dashboard-07-chunk-3'
                  className='xl:w-[60%] lg:w-4/5 bg-card'
                >
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-xl'>Post Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid gap-6'>
                      <div className='grid gap-3'>
                        <Select
                          value={selectedVisibility.value}
                          onValueChange={e => {
                            setSelectedVisibility(
                              visibilityOptions.find(
                                v => v.value === e
                              ) as typeof selectedVisibility
                            )
                          }}
                        >
                          <SelectTrigger id='status' aria-label='Select status'>
                            <SelectValue placeholder='Select status' />
                          </SelectTrigger>
                          <SelectContent>
                            {visibilityOptions.map((item, index) => (
                              <SelectItem
                                key={index}
                                value={item.value}
                                className='cursor-pointer hover:bg-darkAccent/80'
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button variant={'success'}>
                          <Rocket className='mr-2' />
                          Publish
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  x-chunk='dashboard-07-chunk-5'
                  className='p-4 space-y-3 xl:w-[60%] lg:w-4/5 bg-card'
                >
                  <CardHeader className='p-0'>
                    <CardTitle className='text-xl'>Thumbnail</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-2 px-0 pb-0'>
                    <input
                      hidden
                      type='file'
                      id='thumbnail'
                      ref={thumbnailRef}
                      {...thumbnailDropzone.getInputProps()}
                    />
                    <div
                      className='w-full aspect-video border-2 border-dashed bg-darkAccent'
                      {...(!thumbnail?.crop &&
                        thumbnailDropzone.getRootProps())}
                    >
                      {thumbnail ? (
                        thumbnail.crop ? (
                          <Cropper
                            ref={cropperRef}
                            style={{
                              height: '100%',
                              aspectRatio: 16 / 9
                            }}
                            className='object-contain cropper overflow-hidden'
                            aspectRatio={16 / 9}
                            src={thumbnail.url}
                            // zoomTo={0.5}
                            initialAspectRatio={16 / 9}
                            preview='.img-preview'
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            guides={true}
                          />
                        ) : (
                          <div className='h-full w-full flex justify-center items-center'>
                            <Image
                              src={thumbnail.url}
                              alt='thumbnail'
                              width={300}
                              height={300}
                              className='h-full w-full object-cover'
                            />
                          </div>
                        )
                      ) : (
                        <div className='h-full w-full flex flex-col justify-center items-center'>
                          <ImageIcon />
                          <p className='text-sm text-white opacity-70 text-center'>
                            Upload or drag & drop image
                          </p>
                        </div>
                      )}
                    </div>
                    <div className=' w-full flex justify-center items-center gap-3'>
                      {thumbnail && (
                        <Badge
                          variant={'outline'}
                          className='cursor-pointer hover:bg-darkAccent/80'
                          onClick={() => {
                            if (thumbnail.crop) {
                              handleCrop()
                            }
                            //@ts-ignore
                            setThumbnail(prev => ({
                              ...prev,
                              crop: !prev?.crop
                            }))
                          }}
                        >
                          <Crop className='mr-2 text-primary' />
                          <span>Crop</span>
                        </Badge>
                      )}

                      <Badge
                        variant={'outline'}
                        className='cursor-pointer hover:bg-darkAccent/80'
                        {...thumbnailDropzone.getRootProps()}
                      >
                        <Upload className='mr-2 text-primary' />
                        <span>Upload</span>
                      </Badge>
                    </div>
                    {thumbnail?.custom && (
                      <div className='flex justify-center items-center'>
                        <Button
                          variant={'destructive'}
                          className=''
                          onClick={() => {
                            if (thumbnailDropzone.inputRef.current)
                              thumbnailDropzone.inputRef.current.value = ''
                            setThumbnail(
                              images.length
                                ? { ...images[0], custom: false, crop: false }
                                : null
                            )
                          }}
                        >
                          <Delete className='mr-2' />
                          <span>Remove thumbnail</span>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card className='p-4 space-y-3 xl:w-[60%] lg:w-4/5 bg-card'>
                  <CardHeader className='px-0 pb-2 pt-0'>
                    <CardTitle className='text-xl'>Delete</CardTitle>
                  </CardHeader>
                  <CardContent className='px-0 grid place-content-center'>
                    <Button
                      variant={'destructive'}
                      className='min-w-24 '
                      type='button'
                    >
                      <Delete className='mr-2' />
                      Delete Post
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
