import { ImageCollection } from '@/components/custom/gallery'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { sample_cateories } from '@/constants/categories'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { MaterialSymbolIcon } from '@/components/custom'

export default function GalleryPage () {
  return <ImageCollection imageScale={false} />
}
