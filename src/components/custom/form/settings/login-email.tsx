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
import { LoginEmailSchemaType } from '@/schema/login-email'
import { useForm } from 'react-hook-form'

export default function LoginEmailForm ({
  form,
  onSubmit,
  submitLabel
}: {
  form: ReturnType<typeof useForm<LoginEmailSchemaType>>
  onSubmit: (data: LoginEmailSchemaType) => void
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
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='ml-auto w-24' disabled={form.formState.isSubmitting}>
          {submitLabel || 'Save'}
        </Button>
      </form>
    </Form>
  )
}
