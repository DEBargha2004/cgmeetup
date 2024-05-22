import type { Metadata } from 'next'
import { Inter, Open_Sans, Roboto } from 'next/font/google'
import { ThemeProvider } from '@/provider/theme-provider'
import { cn } from '@/lib/utils'
import { Navbar, NavigationHelper } from '@/components/custom'
import './globals.css'
import './global-icons.css'

const inter = Open_Sans({ subsets: ['cyrillic'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        ></link>
      </head>
      <body className={cn(inter.className, 'bg-background')}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar className='h-16' />
          <div className='h-[calc(100%-64px)] overflow-y-auto scroller'>
            {children}
          </div>
          <NavigationHelper />
        </ThemeProvider>
      </body>
    </html>
  )
}
