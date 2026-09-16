import resume from './data/resume.json'

export const SITE_TITLE = 'Nathan Bland'
export const SITE_DESCRIPTION = 'Senior UI Developer, outdoor enthusiast, and occasional writer.'
export const CONTACT_EMAIL = resume.email

export const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nathan-bland-39177766',
    external: true
  },
  {
    label: 'GitHub',
    href: 'https://github.com/nathanbland',
    external: true
  },
  {
    label: 'Writing',
    href: '/blog',
    external: false
  }
] as const

export const RESUME = resume
export const EXPERIENCE = resume.experience.filter((item) => item.featured)
export const EDUCATION = resume.education
