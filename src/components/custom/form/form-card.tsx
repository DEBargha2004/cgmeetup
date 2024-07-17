import { cn } from '@/lib/utils'

export default function FormCard ({
  children,
  className,
  extraButton,
  heading,
  subHeading,
  headerClass
}: {
  children?: React.ReactNode
  className?: string
  heading?: string
  subHeading?: string
  extraButton?: React.ReactNode
  headerClass?: string
}) {
  return (
    <div
      className={cn(
        `w-full flex flex-col justify-start items-stretch gap-0
    rounded border bg-card h-fit @container`,
        className
      )}
    >
      <div className='space-y-4 w-full'>
        <div
          className={cn('space-y-2 p-2 px-4 px bg-lightAccent', headerClass)}
        >
          <div className='flex justify-between items-center'>
            <h1 className='@lg:text-xl text-base font-semibold'>{heading}</h1>
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
