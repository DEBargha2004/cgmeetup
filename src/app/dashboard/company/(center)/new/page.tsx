import { MaterialSymbolIcon } from '@/components/custom'
import {
  CompanyLegalNameForm,
  FieldsContainer,
  FormCard
} from '@/components/custom/form'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Add, MoreVert } from '@mui/icons-material'
import Link from 'next/link'

export default function NewCompanyPage () {
  return (
    <div className='space-y-6'>
      <FormCard
        heading='Search Company'
        subHeading='Please provide the full name of your company that matches the official 
      registration documents. Note: Fail to do may result in verification failure'
        className='@container'
        extraButton={
          <Button className='space-x-2'>
            <Add />
            <span className='@lg:inline hidden'>Create Company</span>
          </Button>
        }
      >
        <FieldsContainer className='md:w-1/2 sm:w-3/4 w-full px-2'>
          <CompanyLegalNameForm />
        </FieldsContainer>
        <FieldsContainer className='w-full px-3'>
          <i className='text-sm mx-auto'>
            If you don't see a company listed, click the "Create Company" button
            above.
          </i>
        </FieldsContainer>
      </FormCard>
      <div className='py-4 flex flex-col justify-center items-center border bg-lightAccent rounded'>
        {Array.from({ length: 4 }, (_, i) => i).map(i => (
          <div key={i} className='w-full flex justify-between items-center p-2'>
            <div>Ast Studio</div>
            <div className='text-yellow-500'>Verification Pending</div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div>
                    <MoreVert className='text-4 cursor-pointer' />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link href={'/dashboard/company'}>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
