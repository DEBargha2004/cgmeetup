import { cn } from '@/lib/utils'

export default function FormCard ({
  children,
  className,
  extraButton,
  heading,
  subHeading
}: {
  children?: React.ReactNode
  className?: string
  heading?: string
  subHeading?: string
  extraButton?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        `w-full flex flex-col justify-start items-stretch gap-0
    rounded border bg-card h-fit`,
        className
      )}
    >
      <div className='space-y-4 w-full'>
        <div className='space-y-2 p-2 px-4 px bg-lightAccent'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold'>{heading}</h1>
            {extraButton}
          </div>
          {subHeading ? (
            <div className='text-sm opacity-70'>
              {subHeading?.split('@new').map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  )
}
