export default function AuthLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className=' w-full flex justify-center items-start py-20'>
      <div className='h-fit w-full sm:w-2/5 px-2 sm:px-0'>{children}</div>
    </div>
  )
}
