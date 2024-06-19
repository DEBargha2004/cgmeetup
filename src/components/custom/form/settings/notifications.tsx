import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { NotificationsSchemaType } from '@/schema/notifications'
import { useForm } from 'react-hook-form'

export default function NotificationsForm ({
  form,
  onSubmit,
  submitLabel,
  checkboxLabel
}: {
  form: ReturnType<typeof useForm<NotificationsSchemaType>>
  onSubmit: (data: NotificationsSchemaType) => void
  submitLabel?: string
  checkboxLabel?: string
}) {
  return (
    <Form {...form}>
      <form
        className='flex flex-col justify-start items-stretch gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='enable'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='flex justify-start items-center gap-2'>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <span>{checkboxLabel}</span>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className='min-w-24 ml-auto'
          type='submit'
          disabled={form.formState.isSubmitting}
        >
          {submitLabel || 'Save'}
        </Button>
      </form>
    </Form>
  )
}
