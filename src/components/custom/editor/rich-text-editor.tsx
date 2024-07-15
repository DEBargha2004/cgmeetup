'use client'

import { cn } from '@/lib/utils'
import { EditorContent, EditorProvider, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import ImageExtension from '@tiptap/extension-image'
import UnderlineExtension from '@tiptap/extension-underline'
import SubScriptExtension from '@tiptap/extension-subscript'
import SuperScriptExtension from '@tiptap/extension-superscript'
import HeadingExtension from '@tiptap/extension-heading'
import TextAlignExtension from '@tiptap/extension-text-align'
import BulletListExtension from '@tiptap/extension-bullet-list'
import ListItemExtension from '@tiptap/extension-list-item'
import OrderedListExtension from '@tiptap/extension-ordered-list'
import HighlightExtension from '@tiptap/extension-highlight'
import ImageResizeExtension from 'tiptap-extension-resize-image'
import YoutubeExtension from '@tiptap/extension-youtube'
import { VideoExtension } from './extensions/video'
import EditorMenuBar from './editor-menu'
import { useState } from 'react'

const CustomImageResizeExtension = ImageResizeExtension.extend({
  addAttributes () {
    return {
      ...this.parent?.(),
      style: {
        default: 'width:400px',
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes => {
          return {
            style: `width:${attributes.style}px;`
          }
        }
      },
      class: {
        default: '',
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          return {
            class: attributes.class
          }
        }
      }
    }
  }
})

const CustomYoutubeExtension = YoutubeExtension.extend({
  addAttributes () {
    return {
      ...this.parent?.(),
      class: {
        default: 'w-full',
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          return {
            class: attributes.class
          }
        }
      }
    }
  }
})

const extensions = [
  StarterKit,
  ImageExtension,
  UnderlineExtension,
  SubScriptExtension,
  SuperScriptExtension,
  HeadingExtension,
  TextAlignExtension.configure({
    types: ['heading', 'paragraph']
  }),
  ListItemExtension,
  BulletListExtension,
  OrderedListExtension,
  HighlightExtension.configure({
    multicolor: true
  }),
  CustomImageResizeExtension,
  CustomYoutubeExtension.configure({
    controls: false,
    nocookie: true
  }),
  VideoExtension
]

export default function RichTextEditor ({
  className,
  content = '',
  onUpdate
}: {
  className?: string
  content?: string
  onUpdate?: (content: string) => void
}) {
  const [innerFocus, setInnerFocus] = useState(false)
  const [contentState, setContentState] = useState(content)
  return (
    <div
      className={cn(
        'rounded-lg focus:ring-2 focus:ring-primary overflow-hidden',
        innerFocus && 'ring-2 ring-primary  ring-offset-background'
      )}
      tabIndex={0}
    >
      <EditorProvider
        extensions={extensions}
        content={contentState}
        onUpdate={({ editor }) => {
          setContentState(editor.getHTML())
          onUpdate?.(editor.getHTML())
        }}
        slotBefore={<EditorMenuBar />}
        onFocus={() => setInnerFocus(true)}
        onBlur={() => setInnerFocus(false)}
        editorProps={{
          attributes: {
            class: cn(
              'max-h-[calc(100vh-200px)] min-h-[300px] p-4 overflow-y-auto scroller-hide outline-none bg-darkAccent',
              className
            )
          },
          handleDrop: e => {}
        }}
      />
    </div>
  )
}

export function EditorContentComponent ({
  className,
  content = ''
}: {
  className?: string
  content?: string
}) {
  const editor = useEditor({
    extensions,
    content
  })
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      editorProps={{
        attributes: {
          class: cn(
            'min-h-[300px] py-4 overflow-y-auto scroller-hide outline-none bg-darkAccent min-w-[100px] w-full',
            className
          ),
          spellCheck: 'false',
          contentEditable: 'false'
        }
      }}
    />
  )
}
