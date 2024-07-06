'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCurrentEditor } from '@tiptap/react'
import { forwardRef, HTMLProps, useEffect, useState } from 'react'
import MaterialSymbolIcon from '../material-symbol-icon'
import { Level } from '@tiptap/extension-heading'
import { Separator } from '@/components/ui/separator'
import './styles.css'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { urlSchema, UrlSchemaType } from '@/schema/url'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'

type TextType = { element: JSX.Element; level: number; label: string }
export default function EditorMenuBar () {
  const { editor } = useCurrentEditor()
  const urlForm = useForm<UrlSchemaType>({
    resolver: zodResolver(urlSchema)
  })
  const imageUploader = useDropzone({
    multiple: false,
    accept: {
      'image/*': []
    }
  })

  const videoUploader = useDropzone({
    multiple: false,
    accept: {
      'video/*': []
    }
  })

  const [selectedColor, setSelectedColor] = useState({
    highlight: 'red'
  })

  const changeTextType = (level: number) => {
    if (level === 0) {
      editor?.chain().focus().setParagraph().run()
    } else {
      editor
        ?.chain()
        .focus()
        .setHeading({ level: level as Level })
        .run()
    }
  }
  const currentTextType = (() => {
    if (!editor) return null

    if (editor.isActive('paragraph')) return 0

    return textTypes
      .map(type => {
        if (editor.isActive('heading', { level: type.level })) return type.level
        return null
      })
      .filter(level => level != null)[0]
  })()

  const handleUrlSubmit = (data: UrlSchemaType) => {
    editor?.chain().focus().setImage({ src: data.url }).run()
    urlForm.reset({ url: '' })
  }
  const handleVideoUrlSubmit = (data: UrlSchemaType) => {
    console.log(data)
    editor?.chain().focus().setYoutubeVideo({ src: data.url }).run()
    urlForm.reset({ url: '' })
  }

  useEffect(() => {
    if (!editor) return

    if (imageUploader.acceptedFiles.length) {
      const reader = new FileReader()

      reader.readAsDataURL(imageUploader.acceptedFiles[0])

      reader.onloadend = () => {
        editor
          .chain()
          .focus()
          .setImage({ src: reader.result as string })
          .run()
      }
    }
  }, [editor, imageUploader.acceptedFiles])

  useEffect(() => {
    if (!editor) return

    if (videoUploader.acceptedFiles.length) {
      const reader = new FileReader()

      reader.readAsDataURL(videoUploader.acceptedFiles[0])

      reader.onloadend = () => {
        editor
          .chain()
          .focus()
          .setVideo({ src: reader.result as string })
          .run()
      }
    }
  }, [editor, videoUploader.acceptedFiles])

  if (!editor) return null

  return (
    <div className='flex flex-wrap gap-1 border-b p-2'>
      <>
        <DropdownMenu>
          <DropdownMenuTrigger className='w-1/6 min-w-[120px] bg-transparent'>
            <Button
              variant={'light_ghost'}
              className='w-full flex justify-between items-center border'
              size={'icon'}
            >
              <p className=' flex justify-start'>
                {textTypes.find(type => type.level === currentTextType)?.label}
              </p>
              <MaterialSymbolIcon className='text-sm'>
                arrow_drop_down
              </MaterialSymbolIcon>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {textTypes.slice(0, 1).map(type => (
              <DropdownMenuItem
                key={type.level}
                onClick={() => changeTextType(type.level)}
              >
                {type.element}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            {textTypes.slice(1).map(type => (
              <DropdownMenuItem
                key={type.level}
                onClick={() => changeTextType(type.level)}
              >
                {type.element}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
      <Separator orientation='vertical' className='h-10' />
      <>
        <Button
          variant={editor.isActive('bold') ? 'secondary' : 'light_ghost'}
          disabled={!editor.can().toggleBold()}
          onClick={() => editor.chain().focus().toggleBold().run()}
          size={'icon'}
        >
          <MaterialSymbolIcon>format_bold</MaterialSymbolIcon>
        </Button>
        <Button
          variant={editor.isActive('italic') ? 'secondary' : 'light_ghost'}
          disabled={!editor.can().toggleItalic()}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          size={'icon'}
        >
          <MaterialSymbolIcon>format_italic</MaterialSymbolIcon>
        </Button>
        <Button
          variant={editor.isActive('underline') ? 'secondary' : 'light_ghost'}
          disabled={!editor.can().toggleUnderline()}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          size={'icon'}
        >
          <MaterialSymbolIcon>format_underlined</MaterialSymbolIcon>
        </Button>
        <Button
          variant={editor.isActive('strike') ? 'secondary' : 'light_ghost'}
          disabled={!editor.can().toggleStrike()}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          size={'icon'}
        >
          <MaterialSymbolIcon>format_strikethrough</MaterialSymbolIcon>
        </Button>
        <Button
          variant={editor.isActive('subscript') ? 'secondary' : 'light_ghost'}
          disabled={!editor.can().toggleSubscript()}
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          size={'icon'}
        >
          <MaterialSymbolIcon>subscript</MaterialSymbolIcon>
        </Button>
        <Button
          variant={editor.isActive('superscript') ? 'secondary' : 'light_ghost'}
          disabled={!editor.can().toggleSuperscript()}
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          size={'icon'}
        >
          <MaterialSymbolIcon>superscript</MaterialSymbolIcon>
        </Button>
      </>
      <Separator orientation='vertical' className='h-10' />
      <>
        <div className='h-10 flex justify-start items-center gap-1'>
          <Button
            className='relative'
            variant={editor.isActive('highlight') ? 'secondary' : 'light_ghost'}
            size={'icon'}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHighlight({
                  color: selectedColor.highlight || '#0fffff'
                })
                .run()
            }
            disabled={!editor.can().toggleHighlight()}
          >
            <MaterialSymbolIcon className='text-base'>
              ink_highlighter
            </MaterialSymbolIcon>
            <div
              style={{ backgroundColor: selectedColor.highlight }}
              className='absolute bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-3/5'
            />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <div className='h-10 p-[1px] hover:bg-lightAccent grid place-content-center cursor-pointer rounded'>
                <MaterialSymbolIcon className='text-sm'>
                  arrow_drop_down
                </MaterialSymbolIcon>
              </div>
            </PopoverTrigger>
            <PopoverContent className='bg-darkAccent p-1 grid gap-2 w-[240px]'>
              <div className='grid grid-cols-10 gap-1'>
                {color_hex.map((color, idx) => (
                  <div
                    className={cn(
                      'w-full aspect-square rounded-[2px] cursor-pointer hover:opacity-80',
                      selectedColor.highlight === color
                        ? 'ring-2 ring-primary'
                        : ''
                    )}
                    style={{ backgroundColor: color }}
                    key={idx}
                    onClick={() =>
                      setSelectedColor(prev => ({ ...prev, highlight: color }))
                    }
                  />
                ))}
              </div>

              <div className='flex justify-between items-center relative'>
                <label
                  htmlFor='color-picker'
                  className='w-full hover:bg-lightAccent p-2 rounded cursor-pointer text-sm'
                >
                  <p>More Colors</p>
                </label>
                <Input
                  type='color'
                  id='color-picker'
                  className='w-1/4 absolute left-0 opacity-0'
                  onChange={e =>
                    setSelectedColor(prev => ({
                      ...prev,
                      highlight: e.target.value
                    }))
                  }
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Button
          variant={editor.isActive('bulletList') ? 'secondary' : 'light_ghost'}
          size={'icon'}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={!editor.can().toggleBulletList()}
        >
          <MaterialSymbolIcon>format_list_bulleted</MaterialSymbolIcon>
        </Button>
        <Button
          variant={editor.isActive('orderedList') ? 'secondary' : 'light_ghost'}
          size={'icon'}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={!editor.can().toggleOrderedList()}
        >
          <MaterialSymbolIcon>format_list_numbered</MaterialSymbolIcon>
        </Button>
      </>
      <Separator orientation='vertical' className='h-10' />
      <>
        <Popover>
          <PopoverTrigger asChild>
            <Button size={'icon'} variant={'light_ghost'}>
              <MaterialSymbolIcon>format_align_justify</MaterialSymbolIcon>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side='bottom'
            className='p-1 max-w-fit gap-1 bg-darkAccent'
          >
            <div className='flex justify-between items-baseline gap-1'>
              {justifyTypes.map(type => (
                <Button
                  key={type.value}
                  size={'icon'}
                  disabled={!editor.can().setTextAlign(type.value)}
                  variant={
                    editor.isActive({ textAlign: type.value })
                      ? 'secondary'
                      : 'light_ghost'
                  }
                  onClick={() =>
                    editor.chain().focus().setTextAlign(type.value).run()
                  }
                >
                  <MaterialSymbolIcon className='text-base'>
                    {type.icon}
                  </MaterialSymbolIcon>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button size={'icon'} variant={'light_ghost'}>
              <MaterialSymbolIcon>image</MaterialSymbolIcon>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='bg-darkAccent'>
            <Tabs defaultValue='link'>
              <TabsList className='w-full'>
                <TabsTrigger value='link' className='w-full'>
                  Link
                </TabsTrigger>
                <TabsTrigger value='image' className='w-full'>
                  Image
                </TabsTrigger>
              </TabsList>
              <TabsContent value='link'>
                <Form {...urlForm}>
                  <form
                    onSubmit={urlForm.handleSubmit(handleUrlSubmit)}
                    className='flex justify-between items-start gap-2'
                  >
                    <FormField
                      control={urlForm.control}
                      name='url'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} placeholder='URL' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button>apply</Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value='image'>
                <input hidden type='file' {...imageUploader.getInputProps()} />
                <div
                  className='w-full py-2 rounded bg-lightAccent cursor-pointer grid place-content-center 
                text-sm hover:bg-lightAccent/80'
                  {...imageUploader.getRootProps()}
                >
                  Upload Image
                </div>
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button size={'icon'} variant={'light_ghost'}>
              <MaterialSymbolIcon>videocam</MaterialSymbolIcon>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='bg-darkAccent'>
            <Tabs defaultValue='link'>
              <TabsList className='w-full'>
                <TabsTrigger value='link' className='w-full'>
                  Link
                </TabsTrigger>
                <TabsTrigger value='video' className='w-full'>
                  Video
                </TabsTrigger>
              </TabsList>
              <TabsContent value='link'>
                <Form {...urlForm}>
                  <form
                    onSubmit={urlForm.handleSubmit(handleVideoUrlSubmit)}
                    className='flex justify-between items-start gap-2'
                  >
                    <FormField
                      control={urlForm.control}
                      name='url'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} placeholder='URL' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button>apply</Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value='video'>
                <input hidden type='file' {...videoUploader.getInputProps()} />
                <div
                  className='w-full py-2 rounded bg-lightAccent cursor-pointer grid place-content-center 
                text-sm hover:bg-lightAccent/80'
                  {...videoUploader.getRootProps()}
                >
                  Upload Video
                </div>
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>
      </>
    </div>
  )
}

const HeaderItemWrapper = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & {}
>(({ className, children, disabled, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={cn('p-2 hover:bg-lightAccent', className)}
  >
    {children}
  </div>
))

HeaderItemWrapper.displayName = 'HeaderItemWrapper'

const textTypes: TextType[] = [
  {
    element: <p>Paragraph</p>,
    level: 0,
    label: 'Paragraph'
  },
  {
    element: <h1>Heading 1</h1>,
    level: 1,
    label: 'Heading 1'
  },
  {
    element: <h2>Heading 2</h2>,
    level: 2,
    label: 'Heading 2'
  },
  {
    element: <h3>Heading 3</h3>,
    level: 3,
    label: 'Heading 3'
  },
  {
    element: <h4>Heading 4</h4>,
    level: 4,
    label: 'Heading 4'
  },
  {
    element: <h5>Heading 5</h5>,
    level: 5,
    label: 'Heading 5'
  },
  {
    element: <h6>Heading 6</h6>,
    level: 6,
    label: 'Heading 6'
  }
]

const fontSizes = [
  'Default',
  8,
  10,
  12,
  14,
  16,
  18,
  20,
  24,
  30,
  36,
  48,
  60,
  72,
  96
]

const justifyTypes: { icon: string; value: string }[] = [
  { icon: 'format_align_left', value: 'left' },
  { icon: 'format_align_center', value: 'center' },
  { icon: 'format_align_right', value: 'right' },
  { icon: 'format_align_justify', value: 'justify' }
]

const color_hex = [
  '#000000',
  '#FFFFFF',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FF00FF',
  '#00FFFF',
  '#808080',
  '#800000',
  '#808000',
  '#800080',
  '#008000',
  '#8000FF'
]
