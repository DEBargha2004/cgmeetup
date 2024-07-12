'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import {
  CompanyAddressForm,
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
import { AddressSchemaType, addressSchema } from '@/schema/address'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function WorkExperiencePage () {
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState({
    show: false,
    index: -1
  })
  const [addresses, setAddresses] = useState<AddressSchemaType[]>([])

  const form = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema)
  })

  const editForm = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema)
  })

  const handleFormSubmit = async (data: AddressSchemaType) => {
    setAddresses(prev => [...prev, data])
    setShowForm(false)
    form.reset()
  }

  const handleEditFormSubmit = async (data: AddressSchemaType) => {
    setAddresses(prev =>
      prev.map((item, index) => (index === showEditForm.index ? data : item))
    )
    setShowEditForm({ show: false, index: -1 })
    editForm.reset()
  }

  const handleDelete = (idx: number) => {
    setAddresses(prev => prev.filter((_, i) => i !== idx))
  }

  const handleEdit = (idx: number) => {
    const selectedWorkExp = addresses[idx]
    editForm.reset(selectedWorkExp)
    setShowForm(false)
    setShowEditForm({ show: true, index: idx })
  }

  console.log(editForm.formState.errors)
  return (
    <section className='space-y-5'>
      <FormCard
        subHeading='Please fill your addresses'
        heading='Addresses'
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
            <span className='@lg:inline hidden'>Add Address</span>
          </Button>
        }
      >
        <FieldsContainer className='w-1/2'>
          {showForm ? (
            <>
              <CompanyAddressForm onSubmit={handleFormSubmit} form={form} />
              <Separator />
            </>
          ) : null}

          {showEditForm.show ? (
            <>
              <CompanyAddressForm
                onSubmit={handleEditFormSubmit}
                form={editForm}
              />
              <Separator />
            </>
          ) : null}
        </FieldsContainer>
        <FieldsContainer className='w-full px-4'>
          {addresses.map((address, idx) => (
            <div className='space-y-2 w-full' key={idx}>
              <div>
                <h1 className='text-lg text-white flex justify-between items-center'>
                  {address.company_name}
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
                <h1 className=''>{address.address}</h1>
              </div>
              <div className='opacity-60 text-base'>
                <p>{address.email_id}</p>
                <p>{address.phone_number}</p>
                <p>{address.website}</p>
              </div>
            </div>
          ))}
        </FieldsContainer>
      </FormCard>
    </section>
  )
}
