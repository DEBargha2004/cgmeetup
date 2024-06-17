import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { EmailDigestsSchemaType } from '@/schema/notifications'
import { useForm } from 'react-hook-form'

export default function EmailDigestsForm ({
  form,
  onSubmit,
  submitLabel
}: {
  form: ReturnType<typeof useForm<EmailDigestsSchemaType>>
  onSubmit: (data: EmailDigestsSchemaType) => void
  submitLabel?: string
}) {
  return (
    <Form {...form}>
      <form
        className='flex flex-col justify-start items-stretch gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='options'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Digests</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup></SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='min-w-24 ml-auto'
          disabled={form.formState.isSubmitting}
        >
          {submitLabel || 'Save'}
        </Button>
      </form>
    </Form>
  )
}
