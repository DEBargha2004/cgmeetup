'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import {
  EducationForm,
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
import { Separator } from '@/components/ui/separator'
import { EducationSchemaType, educationSchema } from '@/schema/education'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function HighestEducationPage () {
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState({
    show: false,
    index: -1
  })
  const [education, setEducation] = useState<EducationSchemaType[]>([])

  const form = useForm<EducationSchemaType>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      online: false
    }
  })

  const editForm = useForm<EducationSchemaType>({
    resolver: zodResolver(educationSchema)
  })

  const handleFormSubmit = async (data: EducationSchemaType) => {
    setEducation(prev => [...prev, data])
    setShowForm(false)
    form.reset()
  }

  const handleEditFormSubmit = async (data: EducationSchemaType) => {
    setEducation(prev =>
      prev.map((item, index) => (index === showEditForm.index ? data : item))
    )
    setShowEditForm({ show: false, index: -1 })
    editForm.reset()
  }

  const handleDelete = (idx: number) => {
    setEducation(prev => prev.filter((_, i) => i !== idx))
  }

  const handleEdit = (idx: number) => {
    const selectedWorkExp = education[idx]
    editForm.reset(selectedWorkExp)
    setShowForm(false)
    setShowEditForm({ show: true, index: idx })
  }
  return (
    <FormCard
      subHeading='Please fill in your education details'
      heading='Education'
      extraButton={
        <Button
          onClick={() => {
            setShowForm(true)
            setShowEditForm({ show: false, index: -1 })
          }}
        >
          <MaterialSymbolIcon className='mr-2'>add</MaterialSymbolIcon>Add
          Education
        </Button>
      }
    >
      <FieldsContainer className='w-1/2'>
        {showForm ? (
          <>
            <EducationForm onSubmit={handleFormSubmit} form={form} />
            <Separator />
          </>
        ) : null}

        {showEditForm.show ? (
          <>
            <EducationForm onSubmit={handleEditFormSubmit} form={editForm} />
            <Separator />
          </>
        ) : null}

        {education.map((edu, idx) => (
          <div className='space-y-2 w-full' key={idx}>
            <div>
              <h1 className='text-lg text-white flex justify-between items-center'>
                {edu.course}
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
              </h1>
              <h1 className=''>{edu.institution}</h1>
            </div>
            <div className='opacity-60 text-sm space-y-4'>
              <div>
                {/* <p>
                    {work_exp.category},{work_exp.sub_category}
                  </p> */}
                <p>
                  <span>{edu.education_level}</span> |{' '}
                  <span>
                    {format(new Date(edu.from), 'MMM yyyy')} -{' '}
                    {format(new Date(edu.to), 'MMM yyyy')}
                  </span>
                </p>{' '}
                {/* <span>{work_exp.is_intern ? 'Internshp' : ''}</span> */}
              </div>
              <article>{edu.description}</article>
            </div>
          </div>
        ))}
      </FieldsContainer>
    </FormCard>
  )
}
