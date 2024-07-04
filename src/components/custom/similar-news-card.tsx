import Image from 'next/image'
import horizontal from '@/../public/images/dog.webp'
import ProfileInfoOverView from './profile-info-overview'
import MaterialSymbolIcon from './material-symbol-icon'
export default function SimilarNewsCard () {
  return (
    <div className='w-full'>
      <Image
        src={horizontal}
        alt='image'
        height={200}
        width={250}
        className='w-full aspect-video object-cover'
      />
      <div className='p-3 space-y-3 line-clamp-1'>
        <h1 className='text-sm font-semibold'>
          3D Character Artist, Avatars Aquent
        </h1>
        <ProfileInfoOverView
          description='hidden'
          textContainer='justify-center'
          image='h-8 w-8'
        >
          <MaterialSymbolIcon>bookmark</MaterialSymbolIcon>
        </ProfileInfoOverView>
      </div>
    </div>
  )
}
