import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { BrowsingExperienceSchemaType } from '@/schema/browsing-experience'
import { ChangePasswordSchemaType } from '@/schema/change-password'
import { useForm } from 'react-hook-form'

export default function BrowsingExperienceForm ({
  form,
  onSubmit,
  submitLabel
}: {
  form: ReturnType<typeof useForm<BrowsingExperienceSchemaType>>
  onSubmit: (data: BrowsingExperienceSchemaType) => void
  submitLabel?: string
}) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex justify-center items-center gap-4'
      >
        <FormField
          control={form.control}
          name='show_mature_content'
          render={({ field }) => (
            <FormItem className=''>
              <FormControl>
                <div className='flex justify-start items-center gap-2'>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <span className=''>Show Mature Content</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 
        <Button
          type='submit'
          className='w-24 ml-auto'
          disabled={form.formState.isSubmitting}
        >
          {submitLabel || 'Submit'}
        </Button> */}
      </form>
    </Form>
  )
}
