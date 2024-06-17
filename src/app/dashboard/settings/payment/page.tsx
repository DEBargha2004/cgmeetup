'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { FieldsContainer, FormCard } from '@/components/custom/form'
import { PaymentAcceptForm } from '@/components/custom/form/settings'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { PaymentSchemaType, paymentSchema } from '@/schema/payment'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Payment () {
  const [showForm, setShowForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState({
    show: false,
    index: -1
  })
  const [accounts, setAccounts] = useState<PaymentSchemaType[]>([])
  // form start
  const form = useForm<PaymentSchemaType>({
    resolver: zodResolver(paymentSchema)
  })
  const editForm = useForm<PaymentSchemaType>({
    resolver: zodResolver(paymentSchema)
  })
  // form end

  //submit handler start
  const handleFormSubmit = async (data: PaymentSchemaType) => {
    setAccounts(prev => [...prev, data])
    setShowForm(false)
    form.reset()
  }
  const handleEditFormSubmit = async (data: PaymentSchemaType) => {
    setAccounts(prev =>
      prev.map((item, index) => (index === showEditForm.index ? data : item))
    )
    setShowEditForm({ show: false, index: -1 })
    editForm.reset()
  }
  //submit handler end

  const handleDelete = (idx: number) => {
    setAccounts(prev => prev.filter((_, i) => i !== idx))
  }

  const handleEdit = (idx: number) => {
    const selectedWorkExp = accounts[idx]
    editForm.reset(selectedWorkExp)
    setShowForm(false)
    setShowEditForm({ show: true, index: idx })
  }
  return (
    <FormCard
      heading='Payment'
      subHeading='Add your payment method.'
      extraButton={
        <Button
          onClick={() => {
            setShowForm(true)
            setShowEditForm({ show: false, index: -1 })
          }}
        >
          <MaterialSymbolIcon className='mr-2'>add</MaterialSymbolIcon>
          <span>Add Job Preference</span>
        </Button>
      }
    >
      <FieldsContainer className='w-1/2'>
        {showForm ? (
          <>
            <PaymentAcceptForm onSubmit={handleFormSubmit} form={form} />
            <Separator />
          </>
        ) : null}

        {showEditForm.show ? (
          <>
            <PaymentAcceptForm
              onSubmit={handleEditFormSubmit}
              form={editForm}
            />
            <Separator />
          </>
        ) : null}

        {accounts.map((account, idx) => (
          <div className='space-y-2 w-full' key={idx}>
            <h1 className='text-lg text-white flex justify-between items-center'>
              <span>{account.platform}</span>
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
              <p>{account.account_id}</p>
            </div>
          </div>
        ))}
      </FieldsContainer>
    </FormCard>
  )
}
