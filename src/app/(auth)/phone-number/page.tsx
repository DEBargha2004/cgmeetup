import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function PhoneNumber () {
  return (
    <div
      className='p-4 w-full flex flex-col justify-start items-stretch gap-4 
  rounded-lg border'
    >
      <div className='relative'>
        <Input className='py-2 pl-20 h-14 rounded' />
        <DropdownMenu>
          <DropdownMenuTrigger
            className='w-16 absolute left-2 top-1/2 -translate-y-1/2 rounded-sm'
            asChild
          >
            <Button>Picker</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='start'
            className='max-h-[300px] overflow-y-auto scroller w-full'
          >
            {Array.from({ length: 78 }, (_, i) => i + 1).map(item => (
              <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
