'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import {
  FieldsContainer,
  FormCard,
  WorkExperienceForm
} from '@/components/custom/form'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
  WorkExperienceSchemaType,
  workExperienceSchema
} from '@/schema/work-experience'
import { zodResolver } from '@hookform/resolvers/zod'
import { Add, MoreVert } from '@mui/icons-material'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function WorkExperiencePage () {
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState({
    show: false,
    index: -1
  })
  const [workexperiences, setWorkExperiences] = useState<
    WorkExperienceSchemaType[]
  >([])

  const form = useForm<WorkExperienceSchemaType>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      is_intern: false
    }
  })

  const editForm = useForm<WorkExperienceSchemaType>({
    resolver: zodResolver(workExperienceSchema)
  })

  const handleFormSubmit = async (data: WorkExperienceSchemaType) => {
    setWorkExperiences(prev => [...prev, data])
    setShowForm(false)
    form.reset()
  }

  const handleEditFormSubmit = async (data: WorkExperienceSchemaType) => {
    setWorkExperiences(prev =>
      prev.map((item, index) => (index === showEditForm.index ? data : item))
    )
    setShowEditForm({ show: false, index: -1 })
    editForm.reset()
  }

  const handleDelete = (idx: number) => {
    setWorkExperiences(prev => prev.filter((_, i) => i !== idx))
  }

  const handleEdit = (idx: number) => {
    const selectedWorkExp = workexperiences[idx]
    editForm.reset(selectedWorkExp)
    setShowForm(false)
    setShowEditForm({ show: true, index: idx })
  }
  return (
    <section className='space-y-4 w-full'>
      <FormCard
        subHeading='Please fill in your work experience'
        heading='Work Experience'
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
            <span className='@lg:inline hidden'>Add Position</span>
          </Button>
        }
      >
        <FieldsContainer className='w-1/2'>
          {showForm ? (
            <>
              <WorkExperienceForm onSubmit={handleFormSubmit} form={form} />
              <Separator />
            </>
          ) : null}

          {showEditForm.show ? (
            <>
              <WorkExperienceForm
                onSubmit={handleEditFormSubmit}
                form={editForm}
              />
              <Separator />
            </>
          ) : null}

          {workexperiences.map((work_exp, idx) => (
            <div className='space-y-2 w-full' key={idx}>
              <div>
                <h1 className='text-lg text-white flex justify-between items-center'>
                  {work_exp.title}
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
                </h1>
                <h1 className=''>{work_exp.company_name}</h1>
              </div>
              <div className='opacity-60 text-sm space-y-4'>
                <div>
                  <p>
                    {work_exp.category},{work_exp.sub_category}
                  </p>
                  <p>
                    <span>
                      {format(new Date(work_exp.from), 'MMM yyyy')} -{' '}
                      {format(new Date(work_exp.to), 'MMM yyyy')}
                    </span>
                    | <span>{work_exp.location}</span>
                  </p>{' '}
                  <span>{work_exp.is_intern ? 'Internshp' : ''}</span>
                </div>
                <article>{work_exp.description}</article>
              </div>
            </div>
          ))}
        </FieldsContainer>
      </FormCard>
    </section>
  )
}
