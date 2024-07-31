'use client'

import { cn } from '@/lib/utils'
import ReactSlider from 'react-slider'

export default function DualInputRange ({
  className,
  thumbClassName,
  defaultValue,
  minDistance,
  onChange,
  value
}: {} & {
  className?: string
  thumbClassName?: string
  defaultValue?: [number, number]
  minDistance?: number
  onChange?: (value: [number, number]) => void
  value?: [number, number]
}) {
  return (
    <ReactSlider
      className={cn('[&>.track-1]:bg-primary', className)}
      thumbClassName={cn(
        'bg-primary border-2 border-white h-5 w-5 rounded-full -translate-y-1/2 ',
        thumbClassName
      )}
      trackClassName={cn('bg-white h-1 -translate-y-1/2 track')}
      defaultValue={defaultValue}
      ariaLabel={['Lower thumb', 'Upper thumb']}
      ariaValuetext={state => `Thumb value ${state.valueNow}`}
      renderThumb={(props, state) => <div {...props}></div>}
      pearling
      minDistance={minDistance}
      onAfterChange={onChange}
      value={value}
    />
  )
}
