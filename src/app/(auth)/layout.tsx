export default function AuthLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex justify-center items-center py-10 w-2/5 mx-auto'>
      {children}
    </div>
  )
}
