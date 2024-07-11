export default function DoubleColLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return <div className='grid md:grid-cols-2 gap-4 w-full'>{children}</div>
}
