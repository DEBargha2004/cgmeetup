import React from 'react'
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react'

const VideoComponent: React.FC<NodeViewProps> = ({ node }) => {
  return (
    <NodeViewWrapper className='video-wrapper'>
      <video controls src={node.attrs.src} title={node.attrs.title}>
        Your browser does not support the video tag.
      </video>
    </NodeViewWrapper>
  )
}

export default VideoComponent
