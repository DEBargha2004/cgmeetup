export default function CenterLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return <div className='lg:w-1/2 md:w-3/4 w-full mx-auto pt-8'>{children}</div>
}
