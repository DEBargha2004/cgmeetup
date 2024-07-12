'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import {
  FieldsContainer,
  FormCard,
  JobPreferenceForm
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
  ProfileJobPreferenceSchemaType,
  profileJobPreferenceSchema
} from '@/schema/profile-job-preference'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function EditProfilePage () {
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState({
    show: false,
    index: -1
  })
  const [jobPreferences, setJobPreferences] = useState<
    ProfileJobPreferenceSchemaType[]
  >([])

  const form = useForm<ProfileJobPreferenceSchemaType>({
    resolver: zodResolver(profileJobPreferenceSchema)
  })

  const editForm = useForm<ProfileJobPreferenceSchemaType>({
    resolver: zodResolver(profileJobPreferenceSchema)
  })

  const handleFormSubmit = async (data: ProfileJobPreferenceSchemaType) => {
    setJobPreferences(prev => [...prev, data])
    setShowForm(false)
    form.reset()
  }

  const handleEditFormSubmit = async (data: ProfileJobPreferenceSchemaType) => {
    setJobPreferences(prev =>
      prev.map((item, index) => (index === showEditForm.index ? data : item))
    )
    setShowEditForm({ show: false, index: -1 })
    editForm.reset()
  }

  const handleDelete = (idx: number) => {
    setJobPreferences(prev => prev.filter((_, i) => i !== idx))
  }

  const handleEdit = (idx: number) => {
    const selectedWorkExp = jobPreferences[idx]
    editForm.reset(selectedWorkExp)
    setShowForm(false)
    setShowEditForm({ show: true, index: idx })
  }
  return (
    <FormCard
      subHeading='What type of job are you looking for?'
      heading='Job Preference'
      className='@container'
      extraButton={
        <Button
          onClick={() => {
            setShowForm(true)
            setShowEditForm({ show: false, index: -1 })
          }}
          className='space-x-2'
        >
          <MaterialSymbolIcon>add</MaterialSymbolIcon>
          <span className='@lg:inline hidden'>Add Job Preference</span>
        </Button>
      }
    >
      <FieldsContainer className='w-1/2'>
        {showForm ? (
          <>
            <JobPreferenceForm onSubmit={handleFormSubmit} form={form} />
            <Separator />
          </>
        ) : null}

        {showEditForm.show ? (
          <>
            <JobPreferenceForm
              onSubmit={handleEditFormSubmit}
              form={editForm}
            />
            <Separator />
          </>
        ) : null}

        {jobPreferences.map((job_pref, idx) => (
          <div className='space-y-2 w-full' key={idx}>
            <h1 className='text-lg text-white flex justify-between items-center'>
              <span>
                {job_pref.category} - {job_pref.subcategory}
              </span>
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
            <div className=' opacity-60'>
              <p>{job_pref.preferred_city}</p>
              <p>{job_pref.job_type}</p>
              <p>
                {job_pref.expected_salary.currency}{' '}
                {job_pref.expected_salary.lower_limit}LPA -{' '}
                {job_pref.expected_salary.upper_limit}LPA/month
              </p>
            </div>
          </div>
        ))}
      </FieldsContainer>
    </FormCard>
  )
}
