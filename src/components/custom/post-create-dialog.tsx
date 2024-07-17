'use client'

import { useGlobalAppStore } from '@/store/global-app-store'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from '../ui/dialog'
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
import { categories } from '@/constants/job-categories'
import { Switch } from '../ui/switch'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { useWindowSize } from '@uidotdev/usehooks'
import { FancyMultiSelect } from '../ui/fancy-multi-select'
import { Checkbox } from '../ui/checkbox'
import { Navigator } from '@/components/custom'
import {
  Close,
  QuestionMark,
  Image as ImageIcon,
  ArrowBackIos,
  ArrowForwardIos,
  Add,
  SlowMotionVideo,
  Upload,
  Delete,
  SwapHoriz,
  PlayArrow,
  Crop
} from '@mui/icons-material'

type PostMedia = {
  type: 'video' | 'image'
  height: number
  width: number
  url: string
  id: string
}

type DropProps = {
  source: number
  destination: number
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
    (PostMedia & { custom?: boolean; cropping?: boolean }) | null
  >(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSoftwares, setSelectedSoftwares] = useState<string[]>([])
  const [showOptions, setShowOptions] = useState(false)
  const [closeConfirmDialog, setCloseConfirmDialog] = useState(false)
  const [confirmClose, setConfirmClose] = useState(false)
  const [showQuestionInfo, setShowQuestionInfo] = useState(false)
  const [addToPortfolio, setAddToPortfolio] = useState(false)

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

  const handleDrop = ({ source, destination }: DropProps) => {
    if (destination > -1 && destination !== source) {
      const newMediaList = [...mediaList]
      console.log({ source, destination })
      const [removed] = newMediaList.splice(source, 1)
      newMediaList.splice(destination, 0, removed)

      setMediaList(newMediaList)
    }
  }

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

  const isContentAdded = useMemo(() => {
    return title || postDesc || mediaList.length || thumbnail
  }, [title, postDesc, mediaList, thumbnail])

  const cleanData = () => {
    setPostDesc('')
    setMediaList([])
    setThumbnail(null)
    setTitle('')
  }

  const setToInitial = () => {
    cleanData()
    setCloseConfirmDialog(false)
    setConfirmClose(false)
  }

  const handleCrop = () => {
    if (!thumbnail?.cropping) {
      //@ts-ignore
      setThumbnail(prev => ({ ...prev, cropping: true }))
    } else {
      if (cropperRef?.current?.cropper) {
        //@ts-ignore
        setThumbnail(prev => ({
          ...prev,
          cropping: false,
          url: cropperRef.current?.cropper
            .getCroppedCanvas()
            .toDataURL() as string
        }))
      }
    }
  }

  const deleteCustomThumbnail = () => {
    if (thumbnail?.custom) {
      setThumbnail({ ...mediaList[0], custom: false, cropping: false })
    }
  }

  useEffect(() => {
    if (mediaList.length) {
      setThumbnail(prev => {
        if (!prev?.custom) {
          return { ...mediaList[0], custom: false, cropping: false }
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
        setThumbnail({ ...media, custom: true, cropping: false })
      })
    }
  }, [thumbnailDropzone.acceptedFiles])

  useEffect(() => {
    setToInitial()
  }, [postDialogState])

  return (
    <>
      <Dialog
        open={postDialogState}
        onOpenChange={e => {
          if (e) {
            setPostDialogState(e)
          } else {
            if (isContentAdded) {
              if (confirmClose) {
                setPostDialogState(false)
              } else {
                setCloseConfirmDialog(true)
              }
            } else {
              setPostDialogState(false)
            }
          }
        }}
      >
        <DialogContent
          className='max-w-[800px] bg-card px-4 overflow-y-auto scroller-hide 
        max-h-[calc(100vh-20px)] pt-10'
          hideCloseButton
        >
          <DialogClose className='absolute right-2 top-2'>
            <div
              className='h-5 w-5 rounded-full grid place-content-center bg-lightAccent/50 hover:bg-lightAccent/90 
           cursor-pointer'
            >
              <Close className='h-3 opacity-70' />
            </div>
          </DialogClose>
          <div className='flex items-start justify-start gap-2'>
            <div id='user-image' className='xs:block hidden'>
              <div className='w-14 h-14 rounded-full flex justify-center items-center'>
                <Avatar className='h-full w-full'>
                  <AvatarImage src={avatar.src} alt='profile' />
                  <AvatarFallback>{getShortendName('John Doe')}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className='w-full grid gap-2 grow-0'>
              <div className=''>
                <Input
                  className=''
                  placeholder='Title'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className='relative'>
                <Textarea
                  className='overflow-y-auto scroller pb-4'
                  rows={3}
                  placeholder='Description'
                  value={postDesc}
                  onChange={e => setPostDesc(e.target.value)}
                />
                <p className='text-xs opacity-70 absolute bottom-1 right-3'>
                  {postDesc.length}/5000
                </p>
              </div>
              <div className='flex sm:flex-row flex-col justify-between gap-2 items-start w-full'>
                <div className='flex justify-start items-center gap-4 cursor-pointer w-fit'>
                  <input
                    type='file'
                    {...imageDropzone.getInputProps()}
                    hidden
                  />
                  <div
                    className='flex justify-start items-center gap-1 w-fit'
                    {...imageDropzone.getRootProps()}
                  >
                    <ImageIcon className='cursor-pointer h-6 text-success' />
                    <span className='text-sm'>Images</span>
                  </div>
                  <div
                    className='flex justify-start items-center gap-1 w-fit'
                    onClick={() =>
                      setVideoUrlInput(prev => ({ ...prev, show: true }))
                    }
                  >
                    <SlowMotionVideo className='cursor-pointer h-6 text-primary' />
                    <span className='text-sm'>Videos</span>
                  </div>
                </div>
                <div className='flex sm:justify-start justify-between space-x-4 sm:w-fit w-full'>
                  <div className='flex justify-start md:justify-center items-center gap-1'>
                    <div
                      className='flex items-center gap-1'
                      onClick={() => setAddToPortfolio(prev => !prev)}
                    >
                      <Checkbox
                        className='rounded-full'
                        checked={addToPortfolio}
                      />
                      <span
                        className={cn(
                          'whitespace-nowrap text-sm hover:opacity-100 cursor-pointer',
                          addToPortfolio ? 'opacity-100' : 'opacity-70 '
                        )}
                      >
                        Add to Portfolio
                      </span>
                    </div>
                    <div
                      className='h-5 w-5 grid place-content-center rounded-full bg-lightAccent cursor-pointer'
                      onClick={() => setShowQuestionInfo(true)}
                    >
                      <QuestionMark className='h-3' />
                    </div>
                  </div>

                  <Button
                    className='h-8'
                    variant={'success'}
                    // disabled={!(postDesc || mediaList.length)}
                  >
                    Post
                  </Button>
                </div>
              </div>
              {videoInputUrl.show && (
                <div className='flex gap-2'>
                  <VideoUrlForm
                    form={videoUrlForm}
                    onSubmit={handleUrlSubmit}
                  />
                  <Close
                    className='my-auto cursor-pointer'
                    onClick={() => {
                      setVideoUrlInput(prev => ({
                        ...prev,
                        show: false,
                        value: ''
                      }))
                      videoUrlForm.reset()
                    }}
                  />
                </div>
              )}
              {mediaList.length ? (
                <div className='w-full  overflow-hidden relative p-2 bg-darkAccent border'>
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
                        handleDrop={handleDrop}
                      />
                    ))}

                    {mediaList.length ? (
                      <div className='w-1/4 aspect-square grid place-content-center shrink-0'>
                        <div
                          className='h-14 aspect-square rounded-full border-2 border-primary 
                      grid place-content-center cursor-pointer'
                          {...imageDropzone.getRootProps()}
                        >
                          <Add className='h-9' />
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <Navigator
                    Icon={ArrowBackIos}
                    className='absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full grid place-content-center'
                    onClick={() => handleCarouselNavigation('prev')}
                  />
                  <Navigator
                    Icon={ArrowForwardIos}
                    className='absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full grid place-content-center'
                    onClick={() => handleCarouselNavigation('next')}
                  />
                </div>
              ) : null}
              {thumbnail ? (
                <div className='col-span-1'>
                  <p className='text-sm'>Thumbnail</p>
                  <div className='flex flex-col justify-start items-center gap-2'>
                    <div className='w-fit shrink-0'>
                      <NextImage
                        src={thumbnail.url}
                        alt='thumbnail'
                        height={200}
                        width={200}
                        className='h-[200px] aspect-square object-cover '
                      />
                    </div>
                    <div className='self-stretch w-full flex items-center justify-center gap-2'>
                      <div className='w-[100px]'>
                        <input {...thumbnailDropzone.getInputProps()} hidden />
                        <Badge
                          className='h-8 w-full px-2 flex justify-start items-center gap-2
                cursor-pointer'
                          {...thumbnailDropzone.getRootProps()}
                        >
                          <Upload className='h-4 text-success' />
                          <span>Upload</span>
                        </Badge>
                      </div>
                      <Badge
                        className='h-8 w-[100px] px-2 flex justify-start items-center gap-2
                cursor-pointer'
                        onClick={handleCrop}
                      >
                        <Crop className='h-4 text-primary' />
                        <span>Crop</span>
                      </Badge>
                      {thumbnail.custom ? (
                        <Badge
                          className='h-8 w-fit px-2 flex justify-start items-center gap-2
                cursor-pointer'
                          onClick={deleteCustomThumbnail}
                        >
                          <Delete className='h-4 text-destructive' />
                          <span>Remove</span>
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}

              {showOptions ? (
                <div className='grid gap-2'>
                  <FancyMultiSelect
                    options={categories}
                    placeholder='Category'
                  />
                  <FancyMultiSelect
                    options={categories}
                    placeholder='Software Used'
                  />
                </div>
              ) : null}
              {showOptions ? (
                <div className='grid xs:grid-cols-3 gap-5'>
                  <div className='col-span-2 grid xs:grid-cols-2 gap-5'>
                    <div className='flex items-center justify-between xs:justify-start gap-2'>
                      <span className='text-sm'>Mature Content</span>
                      <Switch />
                    </div>
                    <div className='flex items-center justify-between xs:justify-start gap-2'>
                      <span className='text-sm'>Created using AI</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              ) : null}
              {showOptions ? (
                <div className='flex justify-between items-center gap-2 w-full'>
                  <DialogClose>
                    <Badge
                      className='h-8 w-fit px-2 flex justify-between items-center gap-2
                cursor-pointer xs:col-span-1 col-span-2'
                    >
                      <Delete className='h-4' />
                      <span>Delete</span>
                    </Badge>
                  </DialogClose>
                  <div className='flex gap-2 '>
                    <Button className='h-8' variant={'success'}>
                      Post
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={closeConfirmDialog} onOpenChange={setCloseConfirmDialog}>
        <DialogContent className='flex flex-col justify-start items-center bg-card'>
          <DialogHeader>Discard Post</DialogHeader>
          <DialogDescription>This action cannot be undone</DialogDescription>
          <div className='grid grid-cols-2 gap-2 w-1/2'>
            <Button
              variant={'destructive'}
              onClick={() => {
                setConfirmClose(true)
                setPostDialogState(false)
                setCloseConfirmDialog(false)
              }}
            >
              Discard
            </Button>
            <DialogClose className=''>
              <Button variant={'outline'} className='w-full'>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={showQuestionInfo} onOpenChange={setShowQuestionInfo}>
        <DialogContent>
          <DialogDescription>
            <strong className='text-white'>Add to Portfolio:</strong>&nbsp;{' '}
            <span className='opacity-70 text-white'>
              Check to display this post in your Portfolio.
            </span>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <Dialog
        open={thumbnail?.cropping}
        //@ts-ignore
        onOpenChange={e => setThumbnail(prev => ({ ...prev, cropping: e }))}
      >
        <DialogContent className='max-w-[800px] bg-card pb-0'>
          <div
            className='h-[400px]  border 
              bg-darkAccent'
            style={{
              width: Math.min(800, windowDimension.width!) - 48 - 2
            }}
          >
            <Cropper
              ref={cropperRef}
              style={{
                height: '100%',
                width: '100%'
              }}
              className='object-contain cropper overflow-hidden'
              aspectRatio={1}
              src={thumbnail?.url}
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
          </div>
          <div className='w-full p-3 grid place-content-center'>
            <Badge
              className='h-8 w-full px-2 flex justify-start items-center gap-2
                cursor-pointer'
              onClick={handleCrop}
            >
              <Crop className='h-4' />
              <span>Crop</span>
            </Badge>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

const PostMedia = forwardRef<
  HTMLDivElement,
  PostMedia &
    HTMLProps<HTMLDivElement> & {
      index: number
      onDelete?: (id: string) => void
      handleDrop: (params: DropProps) => void
    }
>(
  (
    {
      id,
      url,
      type,
      index,
      tabIndex,
      className,
      onDelete,
      handleDrop,
      ...props
    },
    ref
  ) => {
    const [draggingOver, setDraggingOver] = useState(false)
    return (
      <div
        className={cn(
          'w-full aspect-square relative group cursor-pointer',
          className,
          draggingOver && 'opacity-60'
        )}
        {...props}
        ref={ref}
        draggable
        id={id}
        onDragStart={e => {
          e.dataTransfer.setData('text/plain', index.toString())
        }}
        onDragOver={() => setDraggingOver(true)}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={e => {
          setDraggingOver(false)
          handleDrop({
            source: Number(e.dataTransfer.getData('text/plain')),
            destination: index
          })
        }}
      >
        <div
          className='absolute w-full h-full top-0 left-0 group-hover:opacity-50 bg-black/70 
        transition-all grid place-content-center opacity-0'
        >
          <SwapHoriz className='h-9' />
        </div>
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
            <PlayArrow className='h-[30px]' />
          </div>
        ) : null}
        <div
          className={cn(
            `h-7 w-7 flex justify-center items-center bg-darkAccent/50
      absolute top-2 right-2 rounded-full cursor-pointer`,
            !onDelete && 'hidden'
          )}
        >
          <Close onClick={() => onDelete?.(id)} />
        </div>
      </div>
    )
  }
)

PostMedia.displayName = 'PostMedia'
