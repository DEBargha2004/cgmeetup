export default function AuthLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className='h-full flex justify-center items-center py-10 sm:w-4/5 
    md:w-3/5 lg:w-1/2 xl:w-2/5 mx-auto'
    >
      {children}
    </div>
  )
}
