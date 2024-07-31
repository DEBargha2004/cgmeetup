'use client'

import { DualInputRange } from '@/components/custom'
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
import { Close, KeyboardArrowDown } from '@mui/icons-material'
import {
  createContext,
  Dispatch,
  HTMLProps,
  SetStateAction,
  useContext,
  useState
} from 'react'
import SelectRange from './range-select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'

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

type DefaultListItem = {
  label: string
  value: [number, number]
}

const priceOptions: DefaultListItem[] = [
  {
    label: '$2 - $10',
    value: [2, 10]
  },
  {
    label: '$10 - $20',
    value: [10, 20]
  },
  {
    label: '$20 - $50',
    value: [20, 50]
  },
  {
    label: '$50 - $100',
    value: [50, 100]
  },
  {
    label: '$100+',
    value: [100, Infinity]
  }
]

type FilterContextState = {
  sortSelect: string
  selectedTags: string[]
  selectedPriceRange: {
    custom: [number, number] | null
    defaults: [number, number][]
  }
}
type FilterContextActions = {
  setSortSelect: Dispatch<SetStateAction<FilterContextState['sortSelect']>>
  setSelectedTags: Dispatch<SetStateAction<FilterContextState['selectedTags']>>
  setSelectedPriceRange: Dispatch<
    SetStateAction<FilterContextState['selectedPriceRange']>
  >
}

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
      <SelectTrigger>
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
        'hover:bg-lightAccent',
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

type InputTagType = 'custom' | 'default'

function DefaultList ({
  onChange,
  selectedValues,
  values
}: {
  selectedValues: DefaultListItem[]
  values: DefaultListItem[]
  onChange: (value: DefaultListItem[]) => void
}) {
  return (
    <div className='flex flex-col justify-start items-start gap-3 mt-6'>
      <p className='text-xs'>Quick Selections</p>
      {values.map(value => (
        <div
          key={value.label}
          className='flex items-center justify-start gap-3'
        >
          <Checkbox
            checked={selectedValues.includes(value)}
            onCheckedChange={e => {
              if (e) {
                onChange([...selectedValues, value])
              } else {
                onChange(selectedValues.filter(v => v !== value))
              }
            }}
          />
          <span>{value.label}</span>
        </div>
      ))}
    </div>
  )
}

const InputTag = ({
  value,
  onClose,
  type,
  label
}: {
  value: [number, number]
  onClose: (value: [number, number], type: InputTagType) => void
  type: InputTagType
  label: string
}) => {
  return (
    <Badge
      variant='secondary'
      className='bg-lightAccent hover:bg-lightAccent/70 cursor-pointer'
    >
      {label}
      <button
        className='ml-1 rounded-full outline-none  focus:ring-2  focus:ring-offset-2'
        onMouseDown={e => {
          e.preventDefault()
          e.stopPropagation()
          onClose(value, type)
        }}
      >
        <Close className='h-3 w-3 text-muted-foreground hover:text-foreground' />
      </button>
    </Badge>
  )
}

const PriceRange = ({ max }: { max?: number }) => {
  const filter = useFilter()

  if (filter === null) return null

  const selectedCount =
    filter.selectedPriceRange.defaults.length +
    (filter.selectedPriceRange.custom ? 1 : 0)

  const maxCount = max
    ? selectedCount - max - (filter.selectedPriceRange.custom ? 1 : 0) > 0
      ? selectedCount - max
      : 0
    : 0

  const selectedValues = [
    ...filter.selectedPriceRange.defaults,
    ...[
      filter.selectedPriceRange.custom ? filter.selectedPriceRange.custom : []
    ]
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'bg-transparent hover:bg-transparent flex flex-wrap justify-between min-w-[300px] px-2'
          )}
        >
          {selectedValues.length === 0 && <span>Price</span>}
          <div hidden={selectedValues.length === 0} className='flex gap-1'>
            {filter.selectedPriceRange.custom ? (
              <InputTag
                value={filter.selectedPriceRange.custom}
                label={filter.selectedPriceRange.custom.join(' - ')}
                onClose={(value, type) => {
                  filter.setSelectedPriceRange({
                    ...filter.selectedPriceRange,
                    custom: null
                  })
                }}
                type='custom'
              />
            ) : null}
            {filter.selectedPriceRange.defaults
              .slice(0, max)
              .map((value, index) => (
                <InputTag
                  key={index}
                  value={value}
                  label={
                    priceOptions.find(
                      v => v.value[0] === value[0] && v.value[1] === value[1]
                    )!.label
                  }
                  onClose={(value, type) => {
                    filter.setSelectedPriceRange({
                      ...filter.selectedPriceRange,
                      defaults: filter.selectedPriceRange.defaults.filter(
                        v => v[0] !== value[0] && v[1] !== value[1]
                      )
                    })
                  }}
                  type='default'
                />
              ))}
            {maxCount > 0 && (
              <Badge className='bg-lightAccent'>+{maxCount}</Badge>
            )}
          </div>

          {filter.selectedPriceRange.custom ||
          filter.selectedPriceRange.defaults.length > 0 ? (
            <Close
              fontSize='small'
              onClick={e => {
                e.stopPropagation()
                filter.setSelectedPriceRange({ defaults: [], custom: null })
              }}
            />
          ) : (
            <KeyboardArrowDown fontSize='small' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-card'>
        <SelectRange
          value={filter.selectedPriceRange.custom}
          handleChange={e => {
            console.log(e)
            filter.setSelectedPriceRange({
              ...filter.selectedPriceRange,
              custom: e
            })
          }}
          min={0}
          max={100}
        />
        <DefaultList
          values={priceOptions}
          onChange={values => {
            filter.setSelectedPriceRange({
              ...filter.selectedPriceRange,
              defaults: values.map(v => v.value)
            })
          }}
          selectedValues={priceOptions.filter(p =>
            filter.selectedPriceRange.defaults.some(
              v => v[0] === p.value[0] && v[1] === p.value[1]
            )
          )}
        />
      </PopoverContent>
    </Popover>
  )
}

export function Filter () {
  const [sortSelect, setSortSelect] = useState<string>('Best Match')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<{
    custom: [number, number] | null
    defaults: [number, number][]
  }>({
    custom: null,
    defaults: []
  })
  return (
    <FilterContext.Provider
      value={{
        sortSelect,
        setSortSelect,
        selectedTags,
        setSelectedTags,
        selectedPriceRange,
        setSelectedPriceRange
      }}
    >
      <div className='flex items-center justify-between gap-2 h-10'>
        <FancyMultiSelect
          options={tags.map(t => ({ label: t, value: t }))}
          max={3}
        />
        <div className='hidden lg:flex items-center gap-2'>
          {firstTags.map(tag => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>

        <PriceRange max={2} />
        <div className='hidden xl:flex items-center gap-2'>
          {secondTags.map(tag => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
        <SortSelect />
      </div>
    </FilterContext.Provider>
  )
}
