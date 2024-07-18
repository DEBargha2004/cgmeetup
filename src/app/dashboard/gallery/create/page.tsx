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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Cropper, MaterialSymbolIcon } from '@/components/custom'
import { Switch } from '@/components/ui/switch'
import { sample_cateories } from '@/constants/categories'
import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import PostImage from './_components/post-image'
import { useDropzone } from 'react-dropzone'
import { UploadType } from '@/components/custom'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { FieldType } from '@/types/field-type'
import { ReactCropperElement } from 'react-cropper'
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select'
import {
  FourK,
  Rocket,
  Upload,
  Image as ImageIcon,
  Crop,
  Delete,
  PhotoLibrary,
  SlowMotionVideo
} from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid'

const upload_types: { icon: string; title: string; description: string }[] = [
  {
    icon: 'photo_library',
    title: 'Images',
    description: 'JPG, PNG, GIF'
  },
  {
    icon: 'slow_motion_video',
    title: 'Video',
    description: 'Youtube, Vimeo'
  }
]

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
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([])
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

  const mainFeedDropzone = useDropzone()
  const thumbnailDropzone = useDropzone({
    multiple: false,
    accept: {
      'image/*': []
    }
  })

  const thumbnailRef = useRef<HTMLInputElement>(null)
  const mainUploaderRef = useRef<HTMLInputElement>(null)
  const cropperRef = useRef<ReactCropperElement>(null)

  const handleImageChange = (files: File[] | null) => {
    if (files) {
      const file_length = files.length
      for (let i = 0; i < file_length; i++) {
        const reader = new FileReader()

        reader.readAsDataURL(files[i])

        reader.onloadend = () => {
          //@ts-ignore
          setImages(prev => [
            ...prev,
            {
              id: uuidv4(),
              type: files[i].type,
              url: reader.result as string,
              caption: ''
            }
          ])
        }
      }
    }
  }

  // const onDragEnd = e => {}

  const handleDeleteImage = (id: string) => {
    setImages(prev => prev.filter(image => image.id !== id))
  }
  const handleImageCaptionChange = (id: string, caption: string) => {
    setImages(prev =>
      prev.map(image => (image.id === id ? { ...image, caption } : image))
    )
  }

  const handleCustomThumbnailChange = (files: File[] | null) => {
    if (files?.length) {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])

      reader.onloadend = () => {
        setThumbnail({
          id: uuidv4(),
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
    setThumbnail(prev => {
      if (prev?.custom) return prev
      return images.length ? { ...images[0], custom: false, crop: false } : null
    })
  }, [images])

  useEffect(() => {
    if (mainFeedDropzone.acceptedFiles.length) {
      handleImageChange(mainFeedDropzone.acceptedFiles)
    }
  }, [mainFeedDropzone.acceptedFiles])

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
                  <Link href='#'>Gallery</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Post</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
          <div className=' grid flex-1 auto-rows-max gap-4'>
            <div className='flex items-center gap-4'>
              <h1 className='flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0'>
                Create Post
              </h1>
              <Badge variant='outline' className='ml-auto sm:ml-0'>
                Draft
              </Badge>
              <Badge variant='outline' className='ml-auto sm:ml-0'>
                {selectedVisibility.label}
              </Badge>
            </div>
            <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
              <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
                <Card
                  x-chunk='dashboard-07-chunk-1'
                  className='border-dashed border-2 bg-transparent p-2'
                >
                  <CardContent className='flex flex-col justify-between items-center gap-1 p-0'>
                    <div className='grid grid-cols-2 w-full border-b'>
                      <UploadType
                        // icon='photo_library'
                        // title='Images'
                        // supportedTypes='JPG, PNG, GIF'
                        {...mainFeedDropzone.getRootProps({
                          Icon: PhotoLibrary,
                          title: 'Images',
                          supportedTypes: 'JPG, PNG, GIF'
                        })}
                      />

                      <Dialog onOpenChange={() => setVideoUrl('')}>
                        <DialogTrigger asChild>
                          <UploadType
                            title='Video'
                            supportedTypes='Youtube, Vimeo'
                            Icon={SlowMotionVideo}
                          />
                        </DialogTrigger>
                        <DialogContent className='p-0 space-y-0 bg-darkAccent max-w-[600px]'>
                          <DialogHeader className='p-4 text-xl bg-lightAccent'>
                            Video
                          </DialogHeader>
                          <div className='px-4 py-2 space-y-4'>
                            <div className='space-y-2'>
                              <p>Paste a YouTube or Vimeo video URL here</p>
                              <Input
                                value={videoUrl}
                                onChange={e => setVideoUrl(e.target.value)}
                                placeholder='Example: https://www.youtube.com/watch?v=doPV-Shqm7k'
                                className='placeholder:text-gray-500'
                              />
                            </div>
                            {showFrame && (
                              <iframe
                                src={videoUrl}
                                className='w-full aspect-video'
                              />
                            )}
                            {showFrame && (
                              <div className='space-y-2'>
                                <p>Caption/Title</p>
                                <Input />
                              </div>
                            )}
                          </div>
                          <DialogFooter className='p-4 pt-0'>
                            <Button className='h-8'>Save</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div
                      className='w-full h-[200px] flex flex-col justify-center items-center gap-3 dropzone'
                      {...mainFeedDropzone.getRootProps()}
                    >
                      <input
                        type='file'
                        id='image-post-button'
                        hidden
                        multiple
                        name='files[]'
                        accept='image/*'
                        // @ts-ignore
                        onChange={e => handleImageChange(e.target.files)}
                        ref={mainUploaderRef}
                        {...mainFeedDropzone.getInputProps()}
                      />

                      <Badge
                        variant='outline'
                        className='cursor-pointer hover:bg-lightAccent/70'
                      >
                        <Upload className='mr-2' />
                        <span>Upload Media files</span>
                      </Badge>

                      <p className='text-sm opacity-70'>
                        or drag and drop here
                      </p>
                    </div>
                  </CardContent>
                </Card>
                {images.length > 0 && (
                  <Card>
                    <CardContent className='grid sm:grid-cols-3 grid-cols-2 gap-2 p-1 bg-darkAccent'>
                      {images.map((image, image_idx) => (
                        <PostImage
                          key={image.id}
                          image={image}
                          className='h-full object-contain rounded overflow-hidden'
                          onDelete={handleDeleteImage}
                          handleCaptionChange={handleImageCaptionChange}
                        />
                      ))}
                    </CardContent>
                  </Card>
                )}
                <p className='text-center text-sm text-wrap gap-1'>
                  <span className='text-primary'>
                    <FourK className='h-5' />
                    &nbsp; Upgrade your account
                  </span>
                  &nbsp; to upload images and videos in 4K
                </p>
                <Card x-chunk='dashboard-07-chunk-0' className='bg-card'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-xl'>Post Details</CardTitle>
                    {/* <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription> */}
                  </CardHeader>
                  <CardContent>
                    <div className='grid gap-6'>
                      <div className='grid gap-3'>
                        <Label htmlFor='name'>Title</Label>
                        <Input id='name' type='text' className='w-full' />
                      </div>
                      <div className='grid gap-3'>
                        <Label htmlFor='description'>Description</Label>
                        <Textarea id='description' className='min-h-32' />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card x-chunk='dashboard-07-chunk-2' className='bg-card'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-xl'>Category</CardTitle>
                  </CardHeader>
                  <CardContent className=''>
                    <FancyMultiSelect
                      options={sample_cateories.map(opt => ({
                        label: opt,
                        value: opt
                      }))}
                      placeholder='Select Categories'
                    />
                  </CardContent>
                </Card>
                <Card x-chunk='dashboard-07-chunk-2' className='bg-card'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-xl'>Software Used</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FancyMultiSelect
                      options={sample_cateories.map(opt => ({
                        label: opt,
                        value: opt
                      }))}
                      placeholder='Select Softwares'
                    />
                  </CardContent>
                </Card>
                <Card x-chunk='dashboard-07-chunk-1' className='bg-card'>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-xl'>Other</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid sm:grid-cols-2 gap-x-28 gap-y-5'>
                      <div className='flex justify-between sm:justify-start items-center gap-3'>
                        <Label className=''>Mature Content</Label>
                        <Switch />
                      </div>
                      <div className='flex justify-between sm:justify-start items-center gap-3'>
                        <Label className=''>Created using AI</Label>
                        <Switch />
                      </div>
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
                              visibilityOptions.find(v => v.value === e)!
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
                          <Rocket className='mr-2'>rocket</Rocket>
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
                  <CardHeader
                    className='p-0
                  '
                  >
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
                      className='w-full aspect-square border-2 border-dashed bg-darkAccent'
                      {...(!thumbnail?.crop &&
                        thumbnailDropzone.getRootProps())}
                    >
                      {thumbnail ? (
                        thumbnail.crop ? (
                          <Cropper
                            ref={cropperRef}
                            style={{
                              height: '100%',
                              width: '100%'
                            }}
                            className='object-contain cropper overflow-hidden'
                            aspectRatio={1}
                            src={thumbnail.url}
                            // zoomTo={0.5}
                            initialAspectRatio={1}
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
