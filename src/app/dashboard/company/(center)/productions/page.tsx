'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import {
  FieldsContainer,
  FormCard,
  ProductionsForm
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
  ProductionExperienceSchemaType,
  productionExperienceSchema
} from '@/schema/production'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ProductionsPage () {
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState({
    show: false,
    index: -1
  })
  const [selectedProductions, setSelectedProductions] = useState<
    ProductionExperienceSchemaType[]
  >([])

  const form = useForm<ProductionExperienceSchemaType>({
    resolver: zodResolver(productionExperienceSchema)
  })

  const editForm = useForm<ProductionExperienceSchemaType>({
    resolver: zodResolver(productionExperienceSchema)
  })

  const handleFormSubmit = async (data: ProductionExperienceSchemaType) => {
    setSelectedProductions(prev => [...prev, data])
    setShowForm(false)
    form.reset()
  }

  const handleEditFormSubmit = async (data: ProductionExperienceSchemaType) => {
    setSelectedProductions(prev =>
      prev.map((item, index) => (index === showEditForm.index ? data : item))
    )
    setShowEditForm({ show: false, index: -1 })
    editForm.reset()
  }

  const handleDelete = (idx: number) => {
    setSelectedProductions(prev => prev.filter((_, i) => i !== idx))
  }

  const handleEdit = (idx: number) => {
    const selectedProductionExp = selectedProductions[idx]
    editForm.reset(selectedProductionExp)
    setShowForm(false)
    setShowEditForm({ show: true, index: idx })
  }
  console.log(form.formState.errors)
  return (
    <FormCard
      subHeading='Please fill in your production experiences'
      heading='Production Experiences'
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
          <span className='@lg:inline hidden'>Add Production</span>
        </Button>
      }
    >
      <FieldsContainer className='w-1/2'>
        {showForm ? (
          <>
            <ProductionsForm onSubmit={handleFormSubmit} form={form} />
            <Separator />
          </>
        ) : null}

        {showEditForm.show ? (
          <>
            <ProductionsForm onSubmit={handleEditFormSubmit} form={editForm} />
            <Separator />
          </>
        ) : null}
      </FieldsContainer>
      <FieldsContainer className='w-4/5'>
        {selectedProductions.map((prod, idx) => (
          <div className='flex justify-between items-center gap-2' key={idx}>
            <Image
              src={prod.image}
              alt='cover-art'
              height={300}
              width={300}
              className='w-[200px] aspect-[2/3] object-cover'
            />
            <div className='max-w-[100px]'>
              <p className='text-sm opacity-70'>{prod.release_year}</p>
              <h1 className='text-xl'>{prod.title}</h1>
              <p className='text-sm opacity-70'>{prod.type}</p>
            </div>
            <p className='text-sm opacity-70'>{prod.role}</p>
            <p className='text-sm opacity-70'>{prod.company}</p>
            <div className='self-stretch my-auto'>
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
            </div>
          </div>
        ))}
      </FieldsContainer>
    </FormCard>
  )
}
