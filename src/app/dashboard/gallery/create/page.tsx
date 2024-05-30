'use client'

import Link from 'next/link'
import { ChevronLeft, PlusCircle } from 'lucide-react'

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
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
import {
  MaterialSymbolIcon,
  MaterialSymbolIconOutlined
} from '@/components/custom'
import { Switch } from '@/components/ui/switch'
import { gallery_post_categories } from '@/constants/categories'
import { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import PostImage from './_components/post-image'
import { useDropzone } from 'react-dropzone'

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

const visibilityOptions = ['Public', 'Private']

export default function Dashboard () {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([])
  const [selectedVisibility, setSelectedVisibility] = useState<string>()
  const [images, setImages] = useState<
    { id: string; url: string; type: string; caption: string }[]
  >([])
  const [thumbnail, setThumbnail] = useState<{
    id: string
    url: string
    type: string
    caption: string
    custom: boolean
  } | null>()

  const mainFeedDropzone = useDropzone()
  const thumbnailDropzone = useDropzone()

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
              id: crypto.randomUUID(),
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
    if (files) {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])

      reader.onloadend = () => {
        setThumbnail({
          id: crypto.randomUUID(),
          url: reader.result as string,
          type: files[0].type,
          caption: '',
          custom: true
        })
      }
    }
  }

  useEffect(() => {
    setThumbnail(prev => {
      if (prev?.custom) return prev
      return images.length ? { ...images[0], custom: false } : null
    })
  }, [images])

  useEffect(() => {
    if (mainFeedDropzone.acceptedFiles.length) {
      handleImageChange(mainFeedDropzone.acceptedFiles)
    }
  }, [mainFeedDropzone.acceptedFiles])

  useEffect(() => {
    if (thumbnailDropzone.acceptedFiles.length) {
      handleCustomThumbnailChange(thumbnailDropzone.acceptedFiles)
    }
  }, [thumbnailDropzone.acceptedFiles])

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='flex flex-col sm:gap-4 sm:py-4'>
        <header
          className='sticky top-0 flex z-40 lg:h-14 items-center gap-4 border-b px-4 sm:h-auto 
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
            </div>
            <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8'>
              <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8'>
                <Card
                  x-chunk='dashboard-07-chunk-1'
                  className='border-dashed border-2 bg-transparent p-2'
                >
                  <CardContent className='flex flex-col justify-between items-center gap-1 p-0'>
                    <div className='grid grid-cols-2 w-full border-b'>
                      {upload_types.map((t, t_idx) => (
                        <div
                          className='flex flex-col items-center justify-start gap-1 cursor-pointer p-4
                      hover:bg-lightAccent w-full mx-auto rounded border-r last:border-none'
                          key={t_idx}
                        >
                          <MaterialSymbolIcon className='text-3xl text-primary opacity-100'>
                            {t.icon}
                          </MaterialSymbolIcon>
                          <h1 className='text-lg'>{t.title}</h1>
                          <p className='text-xs opacity-70'>{t.description}</p>
                        </div>
                      ))}
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
                        // {...mainFeedDropzone.getInputProps()}
                      />
                      <Label htmlFor='image-post-button'>
                        <Badge
                          variant='outline'
                          className='cursor-pointer hover:bg-lightAccent/70'
                        >
                          <MaterialSymbolIcon className='mr-2'>
                            upload_2
                          </MaterialSymbolIcon>
                          <span>Upload Media files</span>
                        </Badge>
                      </Label>
                      <p className='text-sm opacity-70'>
                        or drag and drop here
                      </p>
                    </div>
                  </CardContent>
                </Card>
                {images.length > 0 && (
                  <Card>
                    <CardContent className='grid grid-cols-3 gap-2 p-1 bg-darkAccent'>
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
                <p className='text-center text-sm flex justify-center items-end gap-1'>
                  <span className='text-primary '>
                    <MaterialSymbolIconOutlined className=' text-xl relative top-[6px]'>
                      4k
                    </MaterialSymbolIconOutlined>
                    Upgrade your account
                  </span>{' '}
                  to upload images and videos in 4K
                </p>
                <Card x-chunk='dashboard-07-chunk-0'>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
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
                      <div className='flex justify-center items-center gap-2'>
                        <Button variant={'outline'} className='border-primary'>
                          <MaterialSymbolIcon className='sm:mr-2'>
                            image
                          </MaterialSymbolIcon>
                          <span>Artwork</span>
                        </Button>
                        <Button variant={'outline'} className='border-primary'>
                          <MaterialSymbolIcon className='sm:mr-2'>
                            videocam
                          </MaterialSymbolIcon>
                          <span>Video Link</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card x-chunk='dashboard-07-chunk-2'>
                  <CardHeader>
                    <CardTitle>Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid gap-6'>
                      <div className='grid gap-3'>
                        {/* <Label htmlFor='category'>Category</Label> */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div
                              className='p-2 flex justify-between items-center border rounded 
                          h-10 bg-darkAccent md:w-1/2 w-full'
                            >
                              <span>Select Category</span>
                              <MaterialSymbolIcon className=''>
                                keyboard_arrow_down
                              </MaterialSymbolIcon>
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className='max-h-[300px] overflow-y-auto scroller h-[200px] 
                        w-[300px]  p-0'
                          >
                            <div className='bg-lightAccent p-2 relative'>
                              <Input className='pl-7' />
                              <div className='absolute top-1/2 -translate-y-1/2 left-3'>
                                <MaterialSymbolIcon>search</MaterialSymbolIcon>
                              </div>
                            </div>
                            <div className='px-1'>
                              {gallery_post_categories.map(category => (
                                <DropdownMenuItem
                                  key={category.value}
                                  className={cn(
                                    'flex justify-start items-center gap-1 mb-1',
                                    selectedCategory.includes(category.value)
                                      ? 'bg-lightAccent'
                                      : ''
                                  )}
                                  onSelect={e => {
                                    e.preventDefault()
                                    setSelectedCategory(prev => {
                                      if (prev.includes(category.value)) {
                                        return prev.filter(
                                          tag => tag !== category.value
                                        )
                                      }
                                      return [...prev, category.value]
                                    })
                                  }}
                                >
                                  <span
                                    className={cn(
                                      selectedCategory.includes(category.value)
                                        ? 'opacity-100 text-primary'
                                        : 'opacity-0'
                                    )}
                                  >
                                    <MaterialSymbolIcon>
                                      check
                                    </MaterialSymbolIcon>
                                  </span>
                                  <span>{category.label}</span>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <div className='flex flex-wrap gap-2'>
                          {selectedCategory.map(category => (
                            <Badge
                              key={category}
                              className='bg-lightAccent p-2 flex justify-between items-center gap-1'
                            >
                              <span>
                                {
                                  gallery_post_categories.find(
                                    c => c.value === category
                                  )?.label
                                }
                              </span>
                              <MaterialSymbolIcon
                                className='text-sm cursor-pointer'
                                onClick={() => {
                                  setSelectedCategory(prev => {
                                    return prev.filter(c => c !== category)
                                  })
                                }}
                              >
                                close
                              </MaterialSymbolIcon>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {/* <div className='grid gap-3'>
                        <Label htmlFor='subcategory'>
                          Subcategory (optional)
                        </Label>
                        <Switch />
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk='dashboard-07-chunk-2'>
                  <CardHeader>
                    <CardTitle>Software Used</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid gap-6'>
                      <div className='grid gap-3'>
                        {/* <Label htmlFor='category'>Category</Label> */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div
                              className='p-2 flex justify-between items-center border rounded 
                          h-10 bg-darkAccent md:w-1/2 w-full'
                            >
                              <span>Select Software</span>
                              <MaterialSymbolIcon className=''>
                                keyboard_arrow_down
                              </MaterialSymbolIcon>
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className='max-h-[300px] overflow-y-auto scroller h-[200px] 
                        w-[300px]  p-0'
                          >
                            <div className='bg-lightAccent p-2 relative'>
                              <Input className='pl-7' />
                              <div className='absolute top-1/2 -translate-y-1/2 left-3'>
                                <MaterialSymbolIcon>search</MaterialSymbolIcon>
                              </div>
                            </div>
                            <div className='px-1'>
                              {gallery_post_categories.map(category => (
                                <DropdownMenuItem
                                  key={category.value}
                                  className={cn(
                                    'flex justify-start items-center gap-1 mb-1',
                                    selectedSoftware.includes(category.value)
                                      ? 'bg-lightAccent'
                                      : ''
                                  )}
                                  onSelect={e => {
                                    e.preventDefault()
                                    setSelectedSoftware(prev => {
                                      if (prev.includes(category.value)) {
                                        return prev.filter(
                                          tag => tag !== category.value
                                        )
                                      }
                                      return [...prev, category.value]
                                    })
                                  }}
                                >
                                  <span
                                    className={cn(
                                      selectedSoftware.includes(category.value)
                                        ? 'opacity-100 text-primary'
                                        : 'opacity-0'
                                    )}
                                  >
                                    <MaterialSymbolIcon>
                                      check
                                    </MaterialSymbolIcon>
                                  </span>
                                  <span>{category.label}</span>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <div className='flex flex-wrap gap-2'>
                          {selectedSoftware.map(category => (
                            <Badge
                              key={category}
                              className='bg-lightAccent p-2 flex justify-between items-center gap-1'
                            >
                              <span>
                                {
                                  gallery_post_categories.find(
                                    c => c.value === category
                                  )?.label
                                }
                              </span>
                              <MaterialSymbolIcon
                                className='text-sm cursor-pointer'
                                onClick={() => {
                                  setSelectedSoftware(prev => {
                                    return prev.filter(c => c !== category)
                                  })
                                }}
                              >
                                close
                              </MaterialSymbolIcon>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {/* <div className='grid gap-3'>
                        <Label htmlFor='subcategory'>
                          Subcategory (optional)
                        </Label>
                        <Switch />
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
                <Card x-chunk='dashboard-07-chunk-1'>
                  <CardHeader>
                    <CardTitle>Other</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex justify-start items-start gap-10'>
                      <div className='flex justify-between items-center gap-3'>
                        <Label>Mature Content</Label>
                        <Switch />
                      </div>
                      <div className='flex justify-between items-center gap-3'>
                        <Label>Created using AI</Label>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className='grid auto-rows-max items-start gap-4 lg:gap-8'>
                <Card x-chunk='dashboard-07-chunk-3' className='w-[60%]'>
                  <CardHeader>
                    <CardTitle>Post Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='grid gap-6'>
                      <div className='grid gap-3'>
                        <Label htmlFor='status'>
                          <span className='opacity-70'>Status :</span>{' '}
                          <span>Draft</span>
                        </Label>
                        <Label htmlFor='status'>
                          <span className='opacity-70'>Visibility :</span>{' '}
                          <span>{selectedVisibility}</span>
                        </Label>
                        <Select
                          value={selectedVisibility}
                          onValueChange={setSelectedVisibility}
                        >
                          <SelectTrigger id='status' aria-label='Select status'>
                            <SelectValue placeholder='Select status' />
                          </SelectTrigger>
                          <SelectContent>
                            {visibilityOptions.map((item, index) => (
                              <SelectItem
                                key={index}
                                value={item}
                                className='cursor-pointer hover:bg-darkAccent/80'
                              >
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button variant={'success'}>
                          <MaterialSymbolIcon className='mr-2'>
                            rocket
                          </MaterialSymbolIcon>
                          Publish
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  x-chunk='dashboard-07-chunk-5'
                  className='p-4 space-y-3 w-[60%]'
                >
                  <CardHeader
                    className='p-0
                  '
                  >
                    <CardTitle>Thumbnail</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-2 px-0 pb-0'>
                    <input
                      hidden
                      type='file'
                      id='thumbnail'
                      onChange={e =>
                        // @ts-ignore
                        handleCustomThumbnailChange(e.target.files)
                      }
                      accept='image/*'
                      {...thumbnailDropzone.getInputProps({})}
                    />
                    <div
                      className='w-full aspect-square border-2 border-dashed'
                      {...thumbnailDropzone.getRootProps({})}
                    >
                      {thumbnail ? (
                        <div className='h-full w-full flex justify-center items-center'>
                          <Image
                            src={thumbnail.url}
                            alt='thumbnail'
                            width={300}
                            height={300}
                            className='h-full w-full object-cover'
                          />
                        </div>
                      ) : (
                        <label htmlFor='thumbnail'>
                          <div className='h-full w-full flex flex-col justify-center items-center'>
                            <MaterialSymbolIcon>image</MaterialSymbolIcon>
                            <p className='text-sm text-white opacity-70'>
                              Upload or drag & drop image
                            </p>
                          </div>
                        </label>
                      )}
                    </div>
                    <div className=' w-full flex justify-center items-center gap-3'>
                      {thumbnail && (
                        <Badge
                          variant={'outline'}
                          className='cursor-pointer hover:bg-darkAccent/80'
                        >
                          <MaterialSymbolIcon className='mr-2 text-primary opacity-100'>
                            crop
                          </MaterialSymbolIcon>
                          <span>Crop</span>
                        </Badge>
                      )}
                      <label htmlFor='thumbnail'>
                        <Badge
                          variant={'outline'}
                          className='cursor-pointer hover:bg-darkAccent/80'
                        >
                          <MaterialSymbolIcon className='mr-2 text-primary opacity-100'>
                            upload_2
                          </MaterialSymbolIcon>
                          <span>Upload</span>
                        </Badge>
                      </label>
                    </div>
                    {thumbnail?.custom && (
                      <div className='flex justify-center items-center'>
                        <Button
                          variant={'destructive'}
                          className=''
                          onClick={() =>
                            setThumbnail(
                              images.length
                                ? { ...images[0], custom: false }
                                : null
                            )
                          }
                        >
                          <MaterialSymbolIcon className='mr-2'>
                            delete
                          </MaterialSymbolIcon>
                          <span>Remove custom thumbnail</span>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className='flex items-center justify-center gap-2 md:hidden'>
              <Button variant='outline' size='sm'>
                Discard
              </Button>
              <Button size='sm'>Save Product</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
