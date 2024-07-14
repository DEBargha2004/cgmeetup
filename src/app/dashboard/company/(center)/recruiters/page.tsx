'use client'

import { MaterialSymbolIcon, ProfileInfoOverView } from '@/components/custom'
import { FieldsContainer, FormCard } from '@/components/custom/form'
import CompanyRecruiterForm from '@/components/custom/form/company-recruiter'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { RecruiterSchemaType, recruiterSchema } from '@/schema/recruiter'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import pdfIcon from '@/../public/images/pdf.png'
import Image from 'next/image'
import { Add, Check, Close, MoreVert } from '@mui/icons-material'

export default function CompanyRecruiter () {
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState({
    show: false,
    index: -1
  })
  const [recruiters, setRecruiters] = useState<RecruiterSchemaType[]>([])

  const form = useForm<RecruiterSchemaType>({
    resolver: zodResolver(recruiterSchema)
  })

  const editForm = useForm<RecruiterSchemaType>({
    resolver: zodResolver(recruiterSchema)
  })

  const handleFormSubmit = async (data: RecruiterSchemaType) => {
    setRecruiters(prev => [...prev, data])
    setShowForm(false)
    form.reset()
  }

  const handleEditFormSubmit = async (data: RecruiterSchemaType) => {
    setRecruiters(prev =>
      prev.map((item, index) => (index === showEditForm.index ? data : item))
    )
    setShowEditForm({ show: false, index: -1 })
    editForm.reset()
  }

  const handleDelete = (idx: number) => {
    setRecruiters(prev => prev.filter((_, i) => i !== idx))
  }

  const handleEdit = (idx: number) => {
    const selectedWorkExp = recruiters[idx]
    editForm.reset(selectedWorkExp)
    setShowForm(false)
    setShowEditForm({ show: true, index: idx })
  }

  console.log(editForm.formState.errors)
  return (
    <section className='space-y-5'>
      <FormCard
        subHeading='Manage your members'
        heading='Members'
        className='@container'
        extraButton={
          <Button
            onClick={() => {
              setShowForm(true)
              setShowEditForm({ show: false, index: -1 })
            }}
            className='space-x-2'
          >
            <Add />
            <span className='@lg:inline hidden'>Add Member</span>
          </Button>
        }
      >
        <FieldsContainer className='w-1/2'>
          {showForm ? (
            <>
              <CompanyRecruiterForm onSubmit={handleFormSubmit} form={form} />
              <Separator />
            </>
          ) : null}

          {showEditForm.show ? (
            <>
              <CompanyRecruiterForm
                onSubmit={handleEditFormSubmit}
                form={editForm}
              />
              <Separator />
            </>
          ) : null}
        </FieldsContainer>
        <FieldsContainer className='w-full px-4'>
          {recruiters.map((recruiter, idx) => (
            <div className='space-y-2 w-full' key={idx}>
              <ProfileInfoOverView
                titleValue={recruiter.name}
                descriptionValue={`Role: ${recruiter.role}`}
                profileInfo='w-[250px]'
              >
                <div className='w-full flex justify-between items-center'>
                  <div className='flex justify-start items-center gap-10'>
                    <div className='flex justify-center items-center gap-1'>
                      <Image src={pdfIcon} height={20} width={20} alt='pdf' />
                      <p className='hover:text-primary cursor-pointer'>
                        Document
                      </p>
                    </div>
                    <p className='text-orange-500'>Pending</p>
                    <div className='flex justify-center items-center gap-3'>
                      <Close className='cursor-pointer text-destructive' />
                      <Check className='cursor-pointer text-success' />
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className='cursor-pointer'>
                        <MoreVert />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem onClick={() => handleEdit(idx)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(idx)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </ProfileInfoOverView>
            </div>
          ))}
        </FieldsContainer>
      </FormCard>
    </section>
  )
}
