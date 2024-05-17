import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/provider/theme-provider'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/custom'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={cn(inter.className, 'bg-darkAccent')}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar className='h-[10%]' />
          <div className='h-[90%]'>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
