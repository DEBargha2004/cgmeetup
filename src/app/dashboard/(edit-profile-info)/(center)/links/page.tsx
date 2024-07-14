'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import {
  FieldsContainer,
  FormCard,
  SocialsForm
} from '@/components/custom/form'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { socials } from '@/constants/socials'
import { SocialsSchemaType, socialsSchema } from '@/schema/socials'
import { zodResolver } from '@hookform/resolvers/zod'
import { Add, MoreVert, Public } from '@mui/icons-material'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function SocialsPage () {
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState({
    show: false,
    index: -1
  })
  const [selectedSocials, setSelectedSocials] = useState<SocialsSchemaType[]>(
    []
  )

  const form = useForm<SocialsSchemaType>({
    resolver: zodResolver(socialsSchema),
    defaultValues: {
      label: socials[0].label
    }
  })

  const editForm = useForm<SocialsSchemaType>({
    resolver: zodResolver(socialsSchema)
  })

  const handleFormSubmit = async (data: SocialsSchemaType) => {
    setSelectedSocials(prev => [...prev, data])
    setShowForm(false)
    form.reset()
  }

  const handleEditFormSubmit = async (data: SocialsSchemaType) => {
    setSelectedSocials(prev =>
      prev.map((item, index) => (index === showEditForm.index ? data : item))
    )
    setShowEditForm({ show: false, index: -1 })
    editForm.reset()
  }

  const handleDelete = (idx: number) => {
    setSelectedSocials(prev => prev.filter((_, i) => i !== idx))
  }

  const handleEdit = (idx: number) => {
    const selectedWorkExp = selectedSocials[idx]
    editForm.reset(selectedWorkExp)
    setShowForm(false)
    setShowEditForm({ show: true, index: idx })
  }
  return (
    <FormCard
      subHeading='Add your social links.'
      heading='Links'
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
          <span className='@lg:inline hidden'>Add Link</span>
        </Button>
      }
    >
      <FieldsContainer className='w-full px-2'>
        {showForm ? (
          <>
            <SocialsForm onSubmit={handleFormSubmit} form={form} />
            <Separator />
          </>
        ) : null}

        {showEditForm.show ? (
          <>
            <SocialsForm onSubmit={handleEditFormSubmit} form={editForm} />
            <Separator />
          </>
        ) : null}

        {selectedSocials.map((social, idx) => (
          <div className='space-y-2 w-full' key={idx}>
            <div>
              <h1 className='text-lg text-white flex justify-between items-center'>
                <div className='flex justify-start items-center gap-2 text-sm text-primary'>
                  <Public />
                  <Link target='_blank' href={social.url} className=''>
                    {social.url}
                  </Link>
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
              </h1>
            </div>
          </div>
        ))}
      </FieldsContainer>
    </FormCard>
  )
}
