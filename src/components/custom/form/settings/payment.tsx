import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { PaymentSchemaType } from '@/schema/payment'
import { useForm } from 'react-hook-form'

export default function PaymentAcceptForm ({
  form,
  onSubmit,
  submitLabel
}: {
  form: ReturnType<typeof useForm<PaymentSchemaType>>
  onSubmit: (data: PaymentSchemaType) => void
  submitLabel?: string
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col justify-start items-stretch gap-4'
      >
        <FormField
          control={form.control}
          name='platform'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select Platform' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='Paypal'>Paypal</SelectItem>
                      <SelectItem value='Stripe'>Stripe</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='account_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Id</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Acount Id' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-24 ml-auto'
          disabled={form.formState.isSubmitting}
        >
          {submitLabel || 'Save'}
        </Button>
      </form>
    </Form>
  )
}
