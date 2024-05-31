import { FieldType } from '@/types/field-type'

export const categories: (FieldType & { sub_category: FieldType[] })[] = [
  {
    label: 'HR',
    value: 'hr',
    sub_category: [
      {
        label: 'HR-Manager',
        value: 'hr-manager'
      },
      {
        label: 'HR-Executive',
        value: 'hr-executive'
      },
      {
        label: 'HR-Recruiter',
        value: 'hr-recruiter'
      },
      {
        label: 'HR-Coordinator',
        value: 'hr-coordinator'
      }
    ]
  },
  {
    label: 'IT',
    value: 'it',
    sub_category: [
      {
        label: 'Fullstack',
        value: 'fullstack'
      },
      {
        label: 'Java Programmer',
        value: 'java-programmer'
      },
      {
        label: 'Python Programmer',
        value: 'python-programmer'
      }
    ]
  }
]
