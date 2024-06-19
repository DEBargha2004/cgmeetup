'use client'

import { MaterialSymbolIcon, ProfileInfoOverView } from '@/components/custom'
import {
  CompanyAddressForm,
  FieldsContainer,
  FormCard
} from '@/components/custom/form'
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
        extraButton={
          <Button
            onClick={() => {
              setShowForm(true)
              setShowEditForm({ show: false, index: -1 })
            }}
          >
            <MaterialSymbolIcon className='mr-2'>add</MaterialSymbolIcon>
            <span>Add Member</span>
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
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className='cursor-pointer'>
                      <MaterialSymbolIcon>more_vert</MaterialSymbolIcon>
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
              </ProfileInfoOverView>
            </div>
          ))}
        </FieldsContainer>
      </FormCard>
    </section>
  )
}
