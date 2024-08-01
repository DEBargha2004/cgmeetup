'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { expertise_level, job_type, tags } from '@/constants/job-filters'
import { cn } from '@/lib/utils'
import { Close, KeyboardArrowDown, Sort } from '@mui/icons-material'
import {
  createContext,
  Dispatch,
  forwardRef,
  HTMLProps,
  SetStateAction,
  useContext,
  useState
} from 'react'
import SelectRange from './range-select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { getFormattedNumber } from '@/functions/get-formatted-number'
import { Separator } from '@/components/ui/separator'

const sortSelectables: string[] = [
  'Best Match',
  'Top Selling',
  'Newest',
  'Oldest',
  'Lowest price',
  'Highest price'
]

const firstTags: string[] = ['Free', 'On sale']

const secondTags: string[] = [
  '3D Print',
  'Animated',
  'PBR',
  'Rigged',
  'Low Poly'
]

type InputTagType = 'custom' | 'default'

type ListItem_V2 = {
  id?: string
  type: InputTagType
  label: string
  value?: [number, number]
}

const priceOptions: ListItem_V2[] = [
  {
    id: 'p2-10',
    type: 'default',
    label: '$2 - $10',
    value: [2, 10]
  },
  {
    id: 'p10-20',
    type: 'default',
    label: '$10 - $20',
    value: [10, 20]
  },
  {
    id: 'p20-50',
    type: 'default',
    label: '$20 - $50',
    value: [20, 50]
  },
  {
    id: 'p50-100',
    type: 'default',
    label: '$50 - $100',
    value: [50, 100]
  },
  {
    id: 'p100+',
    type: 'default',
    label: '$100+',
    value: [100, Infinity]
  }
]

const freeOptions: ListItem_V2[] = [
  {
    id: 'exclude-free',
    type: 'default',
    label: 'Exclude free'
  }
]

const polyCountOptions: ListItem_V2[] = [
  {
    id: 'pc0-5k',
    type: 'default',
    label: '0 - 5k',
    value: [0, 5000]
  },
  {
    id: 'pc5k-10k',
    type: 'default',
    label: '5k - 10k',
    value: [5000, 10000]
  },
  {
    id: 'pc10k-50k',
    type: 'default',
    label: '10k - 50k',
    value: [10000, 50000]
  },
  {
    id: 'pc50k-100k',
    type: 'default',
    label: '50k - 100k',
    value: [50000, 100000]
  },
  {
    id: 'pc100k-250k',
    type: 'default',
    label: '100k - 250k',
    value: [100000, 250000]
  },
  {
    id: 'pc250k+',
    type: 'default',
    label: '250k+',
    value: [250000, Infinity]
  }
]

type FilterContextState = {
  sortSelect: string
  selectedTags: string[]
  selectedPriceRange: ListItem_V2[]
  selectedPolyCountRange: ListItem_V2[]
}
type FilterContextActions = {
  setSortSelect: Dispatch<SetStateAction<FilterContextState['sortSelect']>>
  setSelectedTags: Dispatch<SetStateAction<FilterContextState['selectedTags']>>
  setSelectedPriceRange: Dispatch<
    SetStateAction<FilterContextState['selectedPriceRange']>
  >
  setSelectedPolyCountRange: Dispatch<
    SetStateAction<FilterContextState['selectedPolyCountRange']>
  >
}

type FormatRangeSelectValue = (value: [number, number]) => string

const FilterContext = createContext<
  (FilterContextState & FilterContextActions) | null
>(null)
const useFilter = () =>
  useContext<(FilterContextState & FilterContextActions) | null>(FilterContext)

const SortSelect = () => {
  const filter = useFilter()

  if (filter === null) return null

  return (
    <Select value={filter.sortSelect} onValueChange={filter.setSortSelect}>
      <SelectTrigger className='h-full'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {sortSelectables.map(item => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const Tag = ({ tag }: { tag: string } & ButtonProps) => {
  const filter = useFilter()

  if (filter === null) return null

  return (
    <Button
      variant={'outline'}
      className={cn(
        'hover:bg-lightAccent h-full',
        filter.selectedTags.includes(tag) ? 'bg-lightAccent' : 'bg-transparent'
      )}
      onClick={() => {
        if (filter.selectedTags.includes(tag)) {
          filter.setSelectedTags(filter.selectedTags.filter(t => t !== tag))
        } else {
          filter.setSelectedTags([...filter.selectedTags, tag])
        }
      }}
    >
      {tag}
    </Button>
  )
}

function DefaultList ({
  onChange,
  selectedValues,
  values
}: {
  selectedValues: ListItem_V2[]
  values: ListItem_V2[]
  onChange: (value: ListItem_V2[]) => void
}) {
  return (
    <div className='flex flex-col justify-start items-start gap-3'>
      {values.map(value => (
        <div
          key={value.label}
          className='flex items-center justify-start gap-3'
        >
          <Checkbox
            checked={Boolean(selectedValues.some(v => v.id === value.id))}
            onCheckedChange={e => {
              if (e) {
                onChange([...selectedValues, value])
              } else {
                onChange(selectedValues.filter(v => v.id !== value.id))
              }
            }}
          />
          <span className='font-light'>{value.label}</span>
        </div>
      ))}
    </div>
  )
}

const InputTag = ({
  children,
  label
}: {
  children?: React.ReactNode
  label: string
}) => {
  return (
    <Badge
      variant='secondary'
      className={cn(
        'bg-lightAccent hover:bg-lightAccent/70 cursor-pointer',
        'flex items-center justify-start gap-0.5'
      )}
    >
      {label}
      {children}
    </Badge>
  )
}

const RangeSelectorWithDefaultValues = ({
  min,
  max,
  onChange,
  values,
  defaultValues,
  className,
  formatRangeValue
}: {
  min: number
  max: number
  onChange: (values: ListItem_V2[]) => void
  values: ListItem_V2[]
  defaultValues: ListItem_V2[]
  className?: string
  formatRangeValue: FormatRangeSelectValue
}) => {
  const defaultListSelectedValues = values.filter(v => v.type === 'default')

  const handleRangeSelectorChange = (e: [number, number]) => {
    if (e[0] === min && e[1] === max) {
      onChange(values.filter(v => v.type !== 'custom'))
    } else {
      onChange(
        values
          .filter(v => v.type === 'default')
          .concat({ type: 'custom', value: e, label: formatRangeValue?.(e) })
      )
    }
  }

  const handleDefaultValuesChange = (e: ListItem_V2[]) => {
    const valuesWithoutDefaults = values.filter(v => v.type !== 'default')
    onChange([...valuesWithoutDefaults, ...e])
  }
  return (
    <div className='space-y-3'>
      <SelectRange
        min={min}
        max={max}
        value={values.find(v => v.type === 'custom')?.value || null}
        handleChange={handleRangeSelectorChange}
      />
      <p className='text-xs'>Quick Selections</p>
      <DefaultList
        values={defaultValues}
        selectedValues={defaultListSelectedValues}
        onChange={handleDefaultValuesChange}
      />
    </div>
  )
}

const SelectedListOptionsRenderer = forwardRef<
  HTMLDivElement,
  {
    max?: number
    values: ListItem_V2[]
    CloseButton?: React.FC<{ value: ListItem_V2 }>
    placeholder?: string
  } & HTMLProps<HTMLDivElement>
>(
  (
    { className, children, max, values, CloseButton, placeholder, ...props },
    ref
  ) => {
    const indexOfCustomValue = values.findIndex(v => v.type === 'custom')
    if (indexOfCustomValue !== -1) {
      const customValue = values.splice(indexOfCustomValue, 1)
      values.unshift(...customValue)
    }
    return (
      <div
        className={cn(
          'h-full min-w-[300px] p-1.5 pl-2 border rounded cursor-pointer',
          'bg-transparent hover:bg-transparent flex flex-wrap justify-between items-center',
          className
        )}
        ref={ref}
        {...props}
      >
        <div className='flex gap-1'>
          {values.length === 0 ? (
            <span className='text-sm'>{placeholder}</span>
          ) : null}
          {values.slice(0, max).map(v => (
            <InputTag key={`${v.label}-${v.type}`} label={v.label}>
              {CloseButton ? <CloseButton value={v} /> : <></>}
            </InputTag>
          ))}
          {max ? (
            values.length > max ? (
              <Badge className='bg-lightAccent'>+{values.length - max}</Badge>
            ) : null
          ) : null}
        </div>
        {children}
      </div>
    )
  }
)

SelectedListOptionsRenderer.displayName = 'SelectedListOptionsRenderer'

const RangeSelectorRoot = ({
  maxTags,
  placeholder,
  deleteOption,
  onChange,
  selectedValues,
  children
}: {
  maxTags: number
  placeholder?: string
  deleteOption?: (value: ListItem_V2) => void
  selectedValues: ListItem_V2[]
  onChange: (values: ListItem_V2[]) => void
  children?: React.ReactNode
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <SelectedListOptionsRenderer
          max={maxTags}
          values={selectedValues}
          placeholder={placeholder}
          CloseButton={({ value }) => (
            <button
              className='ml-1 rounded-full outline-none  focus:ring-2  focus:ring-offset-2'
              onMouseDown={e => {
                e.preventDefault()
                e.stopPropagation()
                deleteOption?.(value)
              }}
            >
              <Close className='h-3 w-3 text-muted-foreground hover:text-foreground' />
            </button>
          )}
        >
          {selectedValues?.length ? (
            <Close
              fontSize='small'
              className='cursor-pointer'
              onClick={e => {
                e.stopPropagation()
                onChange?.([])
              }}
            />
          ) : (
            <KeyboardArrowDown fontSize='small' />
          )}
        </SelectedListOptionsRenderer>
      </PopoverTrigger>
      <PopoverContent className='bg-card'>{children}</PopoverContent>
    </Popover>
  )
}

export function Filter ({ className }: { className?: string }) {
  const [sortSelect, setSortSelect] = useState<string>('Best Match')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<ListItem_V2[]>(
    []
  )
  const [selectedPolyCountRange, setSelectedPolyCountRange] = useState<
    ListItem_V2[]
  >([])

  const deletePriceOption = (value: ListItem_V2) => {
    setSelectedPriceRange(
      selectedPriceRange.filter(v =>
        value.id ? v.id !== value.id : Boolean(v.id)
      )
    )
  }

  const deletePolyCountOption = (value: ListItem_V2) => {
    setSelectedPolyCountRange(
      selectedPolyCountRange.filter(v =>
        value.id ? v.id !== value.id : Boolean(v.id)
      )
    )
  }

  return (
    <FilterContext.Provider
      value={{
        sortSelect,
        setSortSelect,
        selectedTags,
        setSelectedTags,
        selectedPriceRange,
        setSelectedPriceRange,
        selectedPolyCountRange,
        setSelectedPolyCountRange
      }}
    >
      <div
        className={cn(
          'flex items-stretch justify-between gap-2 h-10',
          className
        )}
      >
        <FancyMultiSelect
          options={tags.map(t => ({ label: t, value: t }))}
          max={3}
          className='h-full'
        />

        <div className='hidden lg:flex items-center gap-2'>
          {firstTags.map(tag => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>

        <RangeSelectorRoot
          maxTags={2}
          onChange={setSelectedPriceRange}
          selectedValues={selectedPriceRange}
          deleteOption={deletePriceOption}
          placeholder='Price'
        >
          <RangeSelectorWithDefaultValues
            defaultValues={priceOptions}
            max={1000}
            min={0}
            onChange={setSelectedPriceRange}
            values={selectedPriceRange}
            formatRangeValue={e => `$${e[0]}-$${getFormattedNumber(e[1])}`}
          />
          <Separator className='my-3' />
          <DefaultList
            values={freeOptions}
            selectedValues={selectedPriceRange}
            onChange={setSelectedPriceRange}
          />
        </RangeSelectorRoot>
        <FancyMultiSelect
          max={2}
          options={secondTags.map(t => ({ label: t, value: t }))}
          values={selectedTags.map(t => ({ label: t, value: t }))}
          className='3xl:hidden block'
          placeholder='type'
        />
        <div className='hidden 3xl:flex items-center gap-2'>
          {secondTags.map(tag => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>

        <RangeSelectorRoot
          maxTags={2}
          onChange={setSelectedPolyCountRange}
          selectedValues={selectedPolyCountRange}
          deleteOption={deletePolyCountOption}
          placeholder='Poly Count'
        >
          <RangeSelectorWithDefaultValues
            defaultValues={polyCountOptions}
            max={1000000}
            min={0}
            onChange={setSelectedPolyCountRange}
            values={selectedPolyCountRange}
            formatRangeValue={e =>
              `${getFormattedNumber(e[0])}-${getFormattedNumber(e[1])}`
            }
          />
        </RangeSelectorRoot>
        <SortSelect />
      </div>
    </FilterContext.Provider>
  )
}
