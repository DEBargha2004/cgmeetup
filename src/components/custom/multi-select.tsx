import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import MaterialSymbolIcon from './material-symbol-icon'

export default function MultiSelect ({
  values,
  selectedValues,
  onChange,
  placeholder
}: {
  values: string[]
  selectedValues: string[]
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex flex-wrap gap-1 p-2 border rounded min-h-11 bg-darkAccent'>
          {selectedValues.map((value, i) => (
            <Badge
              key={i}
              className='flex items-center gap-1 cursor-pointer 
          bg-lightAccent hover:bg-darkAccent'
            >
              <span>{value}</span>
            </Badge>
          ))}
          {!selectedValues.length ? (
            <span className='opacity-70 text-sm my-auto px-2'>
              {placeholder}
            </span>
          ) : null}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='start'
        className='max-h-[250px] overflow-auto scroller-hide'
      >
        {values.map(value => (
          <DropdownMenuItem
            key={value}
            onSelect={e => {
              e.preventDefault()
              onChange(value)
            }}
            className='cursor-pointer hover:bg-lightAccent flex items-center justify-start gap-2'
          >
            <div
              className={cn(
                'h-5 w-5 grid place-content-center',
                selectedValues.includes(value) ? '' : 'opacity-0'
              )}
            >
              <MaterialSymbolIcon>check</MaterialSymbolIcon>
            </div>
            {value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
