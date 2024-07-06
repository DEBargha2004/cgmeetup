'use client'

import { useGlobalAppStore } from '@/store/global-app-store'
import { Dialog, DialogContent } from '../ui/dialog'
import MaterialSymbolIcon from './material-symbol-icon'
import { Textarea } from '../ui/textarea'
import {
  HTMLProps,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { Button } from '../ui/button'
import { useDropzone } from 'react-dropzone'
import NextImage from 'next/image'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import avatar from '../../../public/images/profile-1.jpg'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getShortendName, getYoutubeThumbnail } from '@/functions'
import { useForm } from 'react-hook-form'
import { VideoUrlSchemaType, videoUrlSchema } from '@/schema/video-url'
import { zodResolver } from '@hookform/resolvers/zod'
import { VideoUrlForm } from './form'
import { Badge } from '../ui/badge'
import MultiSelect from './multi-select'
import { categories } from '@/constants/job-categories'
import { Switch } from '../ui/switch'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { useWindowSize } from '@uidotdev/usehooks'

type PostMedia = {
  type: 'video' | 'image'
  height: number
  width: number
  url: string
  id: string
}

const softwares = [
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe Indesign',
  'Adobe XD',
  'Figma',
  'Sketch',
  'Adobe Animate',
  'Adobe InCopy',
  'Adobe InDesign',
  'Adobe Illustrator',
  'Adobe Lightroom'
]

export default function PostCreateDialog () {
  const { setPostDialogState, postDialogState } = useGlobalAppStore()

  const [videoInputUrl, setVideoUrlInput] = useState({
    show: false,
    value: ''
  })
  const [title, setTitle] = useState<string>('')
  const [postDesc, setPostDesc] = useState('')
  const [mediaList, setMediaList] = useState<PostMedia[]>([])
  const [thumbnail, setThumbnail] = useState<
    (PostMedia & { custom: boolean }) | null
  >(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSoftwares, setSelectedSoftwares] = useState<string[]>([])
  const [showOptions, setShowOptions] = useState(false)

  const mediaListRef = useRef<HTMLDivElement>(null)
  const cropperRef = useRef<ReactCropperElement>(null)

  const imageDropzone = useDropzone({
    accept: { 'image/*': [] },
    multiple: true
  })
  const thumbnailDropzone = useDropzone({
    accept: { 'image/*': [] },
    multiple: false
  })
  const windowDimension = useWindowSize()

  const videoUrlForm = useForm<VideoUrlSchemaType>({
    resolver: zodResolver(videoUrlSchema)
  })

  const handleUrlSubmit = (data: VideoUrlSchemaType) => {
    const thumbnail_url = getYoutubeThumbnail(data.url)
    const image = new Image()
    image.src = thumbnail_url

    image.onload = () => {
      setMediaList(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          url: thumbnail_url,
          height: image.height,
          width: image.width,
          type: 'video'
        }
      ])
    }

    videoUrlForm.reset()
    setVideoUrlInput({ show: false, value: '' })
  }

  const handleCarouselNavigation = (direction: 'next' | 'prev') => {
    if (mediaListRef.current) {
      const currentScrollLeft = mediaListRef.current.scrollLeft
      mediaListRef.current.scrollTo({
        behavior: 'smooth',
        left:
          direction === 'next'
            ? currentScrollLeft + 200
            : currentScrollLeft - 200
      })
    }
  }

  const handleDeleteImage = (id: string) => {
    setMediaList(prev => prev.filter(media => media.id !== id))
  }
  const handleSoftwareSelect = (id: string) => {
    setSelectedSoftwares(prev => {
      if (prev.includes(id)) {
        return prev.filter(software => software !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const handleCategorySelect = (id: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(id)) {
        return prev.filter(category => category !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  const cropperDimension = useMemo(() => {
    const firstElement = mediaList[0]
    if (firstElement) {
      const dimension =
        firstElement.height > firstElement.width
          ? firstElement.width
          : firstElement.height

      return {
        height: dimension,
        width: dimension
      }
    } else {
      return {
        height: 0,
        width: 0
      }
    }
  }, [mediaList])

  const loadImage = (file: File, cb: (postmedia: PostMedia) => void) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      const image = new Image()
      image.src = reader.result as string

      image.onload = () => {
        cb({
          id: crypto.randomUUID(),
          url: reader.result as string,
          height: image.height,
          width: image.width,
          type: 'image'
        })
      }
    }
  }

  useEffect(() => {
    if (mediaList.length) {
      setThumbnail(prev => {
        if (!prev?.custom) {
          return { ...mediaList[0], custom: false }
        }
        return prev
      })
    }
  }, [mediaList])

  useEffect(() => {
    if (imageDropzone.acceptedFiles.length) {
      imageDropzone.acceptedFiles.forEach(file => {
        loadImage(file, media => setMediaList(prev => [...prev, media]))
      })
    }
  }, [imageDropzone.acceptedFiles])

  useEffect(() => {
    if (title || postDesc || mediaList.length) {
      setShowOptions(true)
    } else {
      setShowOptions(false)
    }
  }, [mediaList, title, postDesc])

  useEffect(() => {
    if (thumbnailDropzone.acceptedFiles.length) {
      loadImage(thumbnailDropzone.acceptedFiles[0], media => {
        setThumbnail({ ...media, custom: true })
      })
    }
  }, [thumbnailDropzone.acceptedFiles])

  return (
    <Dialog
      open={postDialogState}
      onOpenChange={e => {
        setPostDesc('')
        setMediaList([])
        setThumbnail(null)
        setTitle('')
        setPostDialogState(e)
      }}
    >
      <DialogContent
        className='max-w-[800px] bg-card px-4 overflow-y-auto scroller-hide 
        max-h-[calc(100vh-20px)] '
        hideCloseButton
      >
        <div className='flex items-start justify-start gap-2'>
          <div id='user-image'>
            <div className='w-14 h-14 rounded-full flex justify-center items-center'>
              <Avatar className='h-full w-full'>
                <AvatarImage src={avatar.src} alt='profile' />
                <AvatarFallback>{getShortendName('John Doe')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className='w-full grid gap-2'>
            <Input
              className=''
              placeholder='Title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div className='relative'>
              <Textarea
                className='overflow-y-auto scroller pb-4'
                rows={7}
                placeholder='Description'
                value={postDesc}
                onChange={e => setPostDesc(e.target.value)}
              />
              <p className='text-xs opacity-70 absolute bottom-1 right-3'>
                {postDesc.length}/5000
              </p>
            </div>
            <div className='grid xs:grid-cols-3'>
              <div className='grid grid-cols-2 col-span-2 gap-4 cursor-pointer w-fit'>
                <input type='file' {...imageDropzone.getInputProps()} hidden />
                <div
                  className='flex justify-start items-center gap-1 w-fit'
                  {...imageDropzone.getRootProps()}
                >
                  <MaterialSymbolIcon className='cursor-pointer text-2xl opacity-100 text-success'>
                    imagesmode
                  </MaterialSymbolIcon>
                  <span className='text-sm'>Images</span>
                </div>
                <div
                  className='flex justify-start items-center gap-1 w-fit'
                  onClick={() =>
                    setVideoUrlInput(prev => ({ ...prev, show: true }))
                  }
                >
                  <MaterialSymbolIcon className='cursor-pointer text-2xl opacity-100 text-primary'>
                    slow_motion_video
                  </MaterialSymbolIcon>
                  <span className='text-sm'>Videos</span>
                </div>
              </div>
              <div className='col-span-2 xs:col-span-1 w-fit ml-auto'>
                <Button
                  className='h-8'
                  // disabled={!(postDesc || mediaList.length)}
                >
                  Post
                </Button>
              </div>
            </div>
            {videoInputUrl.show && (
              <div className='flex gap-2'>
                <VideoUrlForm form={videoUrlForm} onSubmit={handleUrlSubmit} />
                <MaterialSymbolIcon
                  className='opacity-100 cursor-pointer my-auto'
                  onClick={() => {
                    setVideoUrlInput(prev => ({
                      ...prev,
                      show: false,
                      value: ''
                    }))
                    videoUrlForm.reset()
                  }}
                >
                  close
                </MaterialSymbolIcon>
              </div>
            )}
            {mediaList.length ? (
              <div
                className='w-full col-span-1 overflow-hidden relative p-2 bg-darkAccent border'
                // style={{
                //   width:
                //     Math.min(800, windowDimension.width || 0) -
                //     (16 * 2 + 1 * 2 + 56 + 8)
                // }}
              >
                <div
                  className='flex gap-1 overflow-x-auto scroller-hide transition-all'
                  ref={mediaListRef}
                >
                  {mediaList.map((media, index) => (
                    <PostMedia
                      index={index}
                      key={media.id}
                      {...media}
                      onDelete={handleDeleteImage}
                      className='w-1/3 aspect-square shrink-0'
                    />
                  ))}

                  {mediaList.length ? (
                    <div className='w-1/3 aspect-square grid place-content-center shrink-0'>
                      <div
                        className='h-14 aspect-square rounded-full border-2 border-primary 
                      grid place-content-center cursor-pointer'
                        {...imageDropzone.getRootProps()}
                      >
                        <MaterialSymbolIcon className='text-4xl opacity-100'>
                          add
                        </MaterialSymbolIcon>
                      </div>
                    </div>
                  ) : null}
                </div>
                <Navigator
                  icon='arrow_back_ios'
                  className='absolute left-0 top-1/2 -translate-y-1/2 z-10 '
                  onClick={() => handleCarouselNavigation('prev')}
                />
                <Navigator
                  icon='arrow_forward_ios'
                  className='absolute right-0 top-1/2 -translate-y-1/2 z-10 '
                  onClick={() => handleCarouselNavigation('next')}
                />
              </div>
            ) : null}
            {thumbnail ? (
              <div
                className='col-span-1'
                style={{
                  width:
                    Math.min(800, windowDimension.width || 0) -
                    (16 * 2 + 1 * 2 + 56 + 8)
                }}
              >
                <p className='text-sm'>Thumbnail</p>
                <div
                  className='w-full h-[240px] flex justify-center items-center border 
              p-2 bg-darkAccent relative'
                >
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
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    guides={true}
                  />
                  <div className='absolute w-full bottom-0 py-2 left-0 flex justify-center items-center gap-4'>
                    <input {...thumbnailDropzone.getInputProps()} hidden />
                    <Badge
                      className='h-8 w-fit px-2 flex justify-between items-center gap-2
                cursor-pointer'
                      {...thumbnailDropzone.getRootProps()}
                    >
                      <MaterialSymbolIcon className='opacity-100 text-base'>
                        upload_2
                      </MaterialSymbolIcon>
                      <span>Upload</span>
                    </Badge>
                  </div>
                </div>
              </div>
            ) : null}
            {showOptions ? (
              <div className='grid gap-2'>
                <MultiSelect
                  values={categories.map(({ label }) => label)}
                  onChange={handleCategorySelect}
                  selectedValues={selectedCategories}
                  placeholder='Category'
                />
                <MultiSelect
                  selectedValues={selectedSoftwares}
                  values={softwares}
                  onChange={handleSoftwareSelect}
                  placeholder='Software Used'
                />
              </div>
            ) : null}
            {showOptions ? (
              <div className='grid xs:grid-cols-3 gap-5'>
                <div className='col-span-2 grid xs:grid-cols-2 gap-5'>
                  <div className='flex items-center justify-between gap-2'>
                    <span className='text-sm'>Mature Content</span>
                    <Switch />
                  </div>
                  <div className='flex items-center justify-between gap-2'>
                    <span className='text-sm'>Created using AI</span>
                    <Switch />
                  </div>
                </div>
                <Badge
                  className='h-8 w-fit px-2 flex justify-between items-center gap-2
                cursor-pointer ml-auto xs:col-span-1 col-span-2'
                >
                  <MaterialSymbolIcon className='opacity-100 text-base'>
                    delete
                  </MaterialSymbolIcon>
                  <span>Delete</span>
                </Badge>
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Navigator ({
  icon,
  className,
  ...props
}: { icon: string } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `h-10 w-10 bg-lightAccent/80 rounded-full flex justify-center items-center cursor-pointer`,
        className
      )}
      {...props}
    >
      <MaterialSymbolIcon className='opacity-100 text-base select-none'>
        {icon}
      </MaterialSymbolIcon>
    </div>
  )
}

const PostMedia = forwardRef<
  HTMLDivElement,
  PostMedia &
    HTMLProps<HTMLDivElement> & {
      index: number
      onDelete?: (id: string) => void
    }
>(({ id, url, index, type, className, onDelete, ...props }, ref) => (
  <div
    className={cn('w-full aspect-square relative', className)}
    {...props}
    ref={ref}
    draggable
    id={id}
    data-index={index}
  >
    <NextImage
      src={url}
      alt='post-media'
      className='h-full aspect-square object-cover'
      height={300}
      width={300 * (type === 'image' ? 1 : 16 / 9)}
    />
    {type === 'video' ? (
      <div
        className='absolute h-10 w-10 rounded-full grid place-content-center left-1/2 top-1/2
        -translate-x-1/2 -translate-y-1/2 bg-darkAccent/50'
      >
        <MaterialSymbolIcon className='opacity-100 text-3xl'>
          play_arrow
        </MaterialSymbolIcon>
      </div>
    ) : null}
    <div
      className={cn(
        `h-7 w-7 flex justify-center items-center bg-darkAccent/50
      absolute top-2 right-2 rounded-full cursor-pointer`,
        !onDelete && 'hidden'
      )}
    >
      <MaterialSymbolIcon
        onClick={() => onDelete?.(id)}
        className='opacity-100 text-base'
      >
        close
      </MaterialSymbolIcon>
    </div>
  </div>
))

PostMedia.displayName = 'PostMedia'

// const PostMedia = ({
//   type,
//   id,
//   url,
//   className,
//   onDelete,
//   ...props
// }: PostMedia &
//   HTMLProps<HTMLDivElement> & { onDelete?: (id: string) => void }) => {
//   return (
//     <div className={cn('w-full aspect-square relative', className)} {...props}>
//       <Image
//         src={url}
//         alt='post-media'
//         className='h-full aspect-square object-cover'
//         height={300}
//         width={300 * (type === 'image' ? 1 : 16 / 9)}
//       />
//       {type === 'video' ? (
//         <div
//           className='absolute h-10 w-10 rounded-full grid place-content-center left-1/2 top-1/2
//         -translate-x-1/2 -translate-y-1/2 bg-darkAccent/50'
//         >
//           <MaterialSymbolIcon className='opacity-100 text-3xl'>
//             play_arrow
//           </MaterialSymbolIcon>
//         </div>
//       ) : null}
//       <div
//         className={cn(
//           `h-7 w-7 flex justify-center items-center bg-darkAccent/50
//       absolute top-2 right-2 rounded-full cursor-pointer`,
//           !onDelete && 'hidden'
//         )}
//       >
//         <MaterialSymbolIcon
//           onClick={() => onDelete?.(id)}
//           className='opacity-100 text-base'
//         >
//           close
//         </MaterialSymbolIcon>
//       </div>
//     </div>
//   )
// }
