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
import Link from 'next/link'

export default function NewCompanyPage () {
  return (
    <div className='space-y-6'>
      <FormCard
        heading='Search Company'
        subHeading='Please provide the full name of your company that matches the official 
      registration documents. Note: Fail to do may result in verification failure'
        extraButton={
          <Button>
            <MaterialSymbolIcon className='mr-2'>add</MaterialSymbolIcon>
            <span>Create Company</span>
          </Button>
        }
      >
        <FieldsContainer className='w-1/2'>
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
        <Table>
          <TableBody>
            {Array.from({ length: 1 }, (_, i) => i).map(i => (
              <TableRow key={i}>
                <TableCell>Ast Studio</TableCell>
                <TableCell className='text-yellow-500'>
                  Verification Pending
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div>
                        <MaterialSymbolIcon className='text-sm cursor-pointer'>
                          more_vert
                        </MaterialSymbolIcon>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Link href={'/dashboard/company'}>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
