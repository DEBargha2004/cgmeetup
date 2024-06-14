type Social = {
  label: string
  icon?: string
  placeholder?: string
  href?: (url: string) => string
  validator_regex?: RegExp
}

export const socials: Social[] = [
  {
    label: 'Public Email',
    icon: 'mail',
    placeholder: 'contact@artist.com',
    href: (url: string) => `mailto:${url}`,
    validator_regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  {
    label: 'Website',
    icon: 'language',
    placeholder: 'https://yourwebsite.com',
    href: (url: string) => url,
    validator_regex:
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
  },
  {
    label: 'X',
    icon: 'twitter',
    placeholder: '',
    href: (url: string) => `https://twitter.com/${url}`,
    validator_regex: /^https:\/\/twitter\.com\/[a-zA-Z0-9_]+$/
  },
  {
    label: 'Facebook'
  },
  {
    label: 'Instagram'
  },
  {
    label: 'LinkedIn'
  },
  {
    label: 'Behance'
  },
  {
    label: 'Tumblr'
  },
  {
    label: 'Pinterest'
  },
  {
    label: 'Youtube'
  }
]
