import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import VideoComponent from '../components/video'

interface VideoOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: { src: string; title?: string }) => ReturnType
    }
  }
}

export const VideoExtension = Node.create<VideoOptions>({
  name: 'video',
  group: 'block',
  atom: true,

  addOptions () {
    return {
      HTMLAttributes: {}
    }
  },

  addAttributes () {
    return {
      src: {
        default: null,
        parseHTML: element => element.getAttribute('src')
      },
      title: {
        default: null,
        parseHTML: element => element.getAttribute('title')
      }
    }
  },

  parseHTML () {
    return [
      {
        tag: 'video'
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return [
      'video',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
    ]
  },

  addNodeView () {
    return ReactNodeViewRenderer(VideoComponent)
  },

  addCommands () {
    return {
      setVideo:
        options =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options
          })
        }
    }
  }
})
