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
import { MaterialSymbolIcon } from '@/components/custom'
import { Switch } from '@/components/ui/switch'
import { gallery_post_categories } from '@/constants/categories'
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
  } | null>()

  const thumbnailDropzone = useDropzone()

  const thumbnailRef = useRef<HTMLInputElement>(null)

  // const onDragEnd = e => {}

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
        console.log(thumbnailRef.current)
        if (thumbnailRef.current) {
          console.log(thumbnailRef.current)
          thumbnailRef.current.value = ''
        }
      }
    }
  }

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
                    <Input className='' placeholder='Post Title' />
                    <RichTextEditor />
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
                        <Select>
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
                      onChange={e =>
                        // @ts-ignore
                        handleCustomThumbnailChange(e.target.files)
                      }
                      accept='image/*'
                      {...thumbnailDropzone.getInputProps()}
                    />
                    <div
                      className='w-full aspect-square border-2 border-dashed bg-darkAccent'
                      {...thumbnailDropzone.getRootProps()}
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
                        <div className='h-full w-full flex flex-col justify-center items-center'>
                          <MaterialSymbolIcon>image</MaterialSymbolIcon>
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
                        >
                          <MaterialSymbolIcon className='mr-2 text-primary opacity-100'>
                            crop
                          </MaterialSymbolIcon>
                          <span>Crop</span>
                        </Badge>
                      )}

                      <Badge
                        variant={'outline'}
                        className='cursor-pointer hover:bg-darkAccent/80'
                        {...thumbnailDropzone.getRootProps()}
                      >
                        <MaterialSymbolIcon className='mr-2 text-primary opacity-100'>
                          upload_2
                        </MaterialSymbolIcon>
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
                                ? { ...images[0], custom: false }
                                : null
                            )
                          }}
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
                <Card className='p-4 space-y-3 xl:w-[60%] lg:w-4/5 bg-card'>
                  <CardHeader className='px-0 pb-2 pt-0'>
                    <CardTitle className='text-xl'>Delete</CardTitle>
                  </CardHeader>
                  <CardContent className='px-0'>
                    <Button
                      variant={'destructive'}
                      className='w-full'
                      type='button'
                    >
                      <MaterialSymbolIcon className='mr-2'>
                        delete
                      </MaterialSymbolIcon>
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

const PostCreateOption = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & { icon: string; label: string }
>(({ className, icon, label, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col justify-center items-center gap-2 text-primary py-6 rounded hover:bg-lightAccent cursor-pointer',
      className
    )}
    {...props}
  >
    <MaterialSymbolIcon className='text-3xl'>{icon}</MaterialSymbolIcon>
    <span>{label}</span>
  </div>
))

PostCreateOption.displayName = 'PostCreateOption'
