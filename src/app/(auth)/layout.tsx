export default function AuthLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className='h-full flex justify-center items-center sm:w-4/5 px-2 
    sm:px-0 max-w-sm mx-auto my-10'
    >
      {children}
    </div>
  )
}
