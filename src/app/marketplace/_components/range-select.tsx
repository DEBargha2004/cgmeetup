'use client'

import { DualInputRange } from '@/components/custom'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export default function SelectRange ({
  value,
  handleChange,
  max,
  min,
  className
}: {
  value: [number, number] | null
  handleChange: (value: [number, number]) => void
  className?: string
  min: number
  max: number
}) {
  const [localValue, setLocalValue] = useState<[number, number]>([min, max])

  useEffect(() => {
    setLocalValue(value || [min, max])
  }, [value])
  return (
    <div className='grid gap-6'>
      <DualInputRange
        defaultValue={[min, max]}
        value={localValue}
        onChange={handleChange}
        max={max}
        min={min}
      />
      <div className='flex justify-between items-start'>
        <InputButtons
          onChange={value => handleChange([value, localValue[1]])}
          value={localValue[0]}
          max={localValue[1]}
          min={min}
        />
        <InputButtons
          onChange={value => handleChange([localValue[0], value])}
          value={localValue[1]}
          max={max}
          min={localValue[0]}
        />
      </div>
    </div>
  )
}

function InputButtons ({
  onChange,
  value,
  max,
  min
}: {
  value: number
  onChange?: (value: number) => void
  max?: number
  min?: number
}) {
  const [localValue, setLocalValue] = useState<number>(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])
  return (
    <Input
      className={cn(
        'bg-transparent hover:bg-transparent hover:shadow-lightAccent py-2 border rounded w-24 text-center hide-input-inner-buttons'
      )}
      type='number'
      value={localValue}
      onChange={e => setLocalValue(Number(e.target.value))}
      max={max}
      min={min}
      onBlur={() => onChange?.(localValue)}
    />
  )
}
