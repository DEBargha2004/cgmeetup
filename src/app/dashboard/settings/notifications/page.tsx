'use client'

import { MaterialSymbolIcon } from '@/components/custom'
import { FieldsContainer, FormCard } from '@/components/custom/form'
import {
  EmailDigestsForm,
  NotificationsForm
} from '@/components/custom/form/settings'
import {
  EmailDigestsSchemaType,
  NotificationsSchemaType,
  emailDigestsSchema,
  notificationsSchema
} from '@/schema/notifications'
import { zodResolver } from '@hookform/resolvers/zod'
import { Notifications } from '@mui/icons-material'
import { useForm } from 'react-hook-form'

export default function NotificationsPage () {
  // form start
  const emailDigestsForm = useForm<EmailDigestsSchemaType>({
    resolver: zodResolver(emailDigestsSchema)
  })
  const notificationsOnOthersActivityForm = useForm<NotificationsSchemaType>({
    resolver: zodResolver(notificationsSchema)
  })
  const notificationsOnProjectActivityForm = useForm<NotificationsSchemaType>({
    resolver: zodResolver(notificationsSchema)
  })
  const notificationsOnAnnouncementsForm = useForm<NotificationsSchemaType>({
    resolver: zodResolver(notificationsSchema)
  })
  const notificationsOnJobDigestsForm = useForm<NotificationsSchemaType>({
    resolver: zodResolver(notificationsSchema)
  })
  // form end

  //submit handler start
  const handleEmailDigestsFormSubmit = async (
    data: EmailDigestsSchemaType
  ) => {}
  const handleNotificationsOnOthersActivityFormSubmit = async (
    data: NotificationsSchemaType
  ) => {}
  const handleNotificationsOnProjectActivityFormSubmit = async (
    data: NotificationsSchemaType
  ) => {}
  const handleNotificationsOnAnnouncementsFormSubmit = async (
    data: NotificationsSchemaType
  ) => {}
  const handleNotificationsOnJobDigestsFormSubmit = async (
    data: NotificationsSchemaType
  ) => {}
  //submit handler end

  return (
    <div className='space-y-4 pb-10'>
      <div className='space-y-3'>
        <h1 className='flex justify-start items-center gap-2 xl:text-2xl lg:text-xl sm:text-base'>
          <Notifications className='text-primary h-6' />
          <span>Email Notifications</span>
        </h1>
        <div className='grid sm:grid-cols-2 gap-4 '>
          <FormCard
            heading='Email Digests'
            subHeading=''
            className='rounded w-full @container'
          >
            <FieldsContainer className='@sm:w-4/5 w-full px-2 max-w-[500px]'>
              <EmailDigestsForm
                form={emailDigestsForm}
                onSubmit={handleEmailDigestsFormSubmit}
              />
            </FieldsContainer>
          </FormCard>
          <FormCard
            heading="Email Notifications on Other people's portfolio"
            subHeading=''
            className='rounded h-full w-full @container'
          >
            <FieldsContainer className='@sm:w-4/5 w-full px-2 max-w-[500px]'>
              <NotificationsForm
                form={notificationsOnOthersActivityForm}
                onSubmit={handleNotificationsOnOthersActivityFormSubmit}
                checkboxLabel='Email notification on other People project'
              />
            </FieldsContainer>
          </FormCard>
          <FormCard
            heading='Email Notifications on My activity'
            subHeading=''
            className='rounded w-full @container'
          >
            <FieldsContainer className='@sm:w-4/5 w-full px-2 max-w-[500px]'>
              <NotificationsForm
                form={notificationsOnProjectActivityForm}
                onSubmit={handleNotificationsOnProjectActivityFormSubmit}
                checkboxLabel='Email on all Activities'
              />
            </FieldsContainer>
          </FormCard>
        </div>
      </div>
      <div className='space-y-3'>
        <h1 className='flex justify-start items-center gap-2 xl:text-2xl lg:text-xl sm:text-base'>
          <Notifications className='text-primary h-6' />
          <span>Email Subscriptions</span>
        </h1>
        <div className='grid sm:grid-cols-2 gap-4'>
          <FormCard
            heading='Announcement Emails'
            subHeading=''
            className='rounded w-full @container'
          >
            <FieldsContainer className='@sm:w-4/5 w-full px-2 max-w-[500px]'>
              <NotificationsForm
                form={notificationsOnAnnouncementsForm}
                onSubmit={handleNotificationsOnAnnouncementsFormSubmit}
                checkboxLabel='Subscribe to announcements'
              />
            </FieldsContainer>
          </FormCard>
          <FormCard
            heading='Job'
            subHeading=''
            className='rounded w-full @container'
          >
            <FieldsContainer className='@sm:w-4/5 w-full px-2 max-w-[500px]'>
              <NotificationsForm
                form={notificationsOnJobDigestsForm}
                onSubmit={handleNotificationsOnJobDigestsFormSubmit}
                checkboxLabel='Subscribe to Job Digests'
              />
            </FieldsContainer>
          </FormCard>
        </div>
      </div>
    </div>
  )
}
