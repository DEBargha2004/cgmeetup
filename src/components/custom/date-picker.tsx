'use client'

import { months } from '@/constants/months'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { useCallback, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Dialog, DialogTrigger } from '../ui/dialog'

export default function DatePicker ({
  value,
  onChange,
  label
}: {
  value: string
  onChange: (value: string) => void
  label?: string
}) {
  const generateDateObj = useCallback((value: string) => {
    return {
      month: new Date(value || new Date()).getMonth(),
      year: new Date(value || new Date()).getFullYear()
    }
  }, [])

  const isDateInRange = useCallback((date: Date) => {
    return (
      date.getMonth() >= 0 &&
      date.getMonth() <= 11 &&
      date.getFullYear() >= 1900 &&
      date.getFullYear() <= new Date().getFullYear()
    )
  }, [])
  const [date, setDate] = useState(generateDateObj(value))

  useEffect(() => {
    setDate(generateDateObj(value))
  }, [value])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className='bg-darkAccent rounded-md block w-full text-left hover:bg-inherit'
        >
          {value ? format(new Date(value), 'PPP') : label || 'Select Date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-darkAccent w-fit'>
        <div className='flex justify-center items-center gap-2'>
          <Select
            value={date.month.toString()}
            onValueChange={value =>
              setDate(prev => ({ ...prev, month: parseInt(value) }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Month' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {months.map((month, month_idx) => (
                  <SelectItem key={month} value={month_idx.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={date.year.toString()}
            onValueChange={value =>
              setDate(prev => ({ ...prev, year: parseInt(value) }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Year' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Array.from(
                  { length: new Date().getFullYear() - 1900 + 1 },
                  (_, i) => i + 1900
                ).map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Calendar
          month={new Date(`${date.year}-${date.month + 1}-01`)}
          selected={new Date(value || new Date())}
          disabled={date => date > new Date() || date < new Date('1900-01-01')}
          onDayClick={e => {
            onChange(e.toDateString())
          }}
          onMonthChange={e => {
            setDate(prev => ({
              ...prev,
              month: isDateInRange(e) ? e.getMonth() : prev.month,
              year: isDateInRange(e) ? e.getFullYear() : prev.year
            }))
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
