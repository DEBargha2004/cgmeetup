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
import { ChangePasswordSchemaType } from '@/schema/change-password'
import { useForm } from 'react-hook-form'

export default function ChangePasswordForm ({
  form,
  onSubmit,
  submitLabel
}: {
  form: ReturnType<typeof useForm<ChangePasswordSchemaType>>
  onSubmit: (data: ChangePasswordSchemaType) => void
  submitLabel?: string
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Current Password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <Input type='password' placeholder='New Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-24 col-span-2 ml-auto'
          disabled={form.formState.isSubmitting}
        >
          {submitLabel || 'Submit'}
        </Button>
      </form>
    </Form>
  )
}
