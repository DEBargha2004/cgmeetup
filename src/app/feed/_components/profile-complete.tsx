import { MaterialSymbolIcon } from '@/components/custom'
import ProgressBar from '@/components/custom/progress-bar'
import { Edit } from '@mui/icons-material'

export default function ProfileComplete () {
  return (
    <div className='w-full rounded bg-card flex justify-start items-start gap-2 p-4'>
      <div>
        <ProgressBar value={20} />
      </div>
      <div className='space-y-1'>
        <div className='text-xl font-bold flex justify-between items-start'>
          <h1 className='text-lg'>20% Profile Completed!</h1>
          <div className='flex items-center justify-center text-white opacity-70'>
            <Edit className='h-4 mr-1' />
            <span className='text-sm font-light'>Edit</span>
          </div>
        </div>
        <p className='font-medium text-sm'>
          A complete profile increases the chances of a recruiter being more
          interested in recruiting you
        </p>
      </div>
    </div>
  )
}
