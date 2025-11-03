import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { createServerComponentClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Commerce Store',
  description: 'A simple e-commerce store built with Next.js and Supabase.',
  openGraph: {
    title: 'E-Commerce Store',
    description: 'A simple e-commerce store built with Next.js and Supabase.',
    url: 'https://your-deployed-url.com', // Replace with your actual URL
    siteName: 'E-Commerce Store',
    images: [
      {
        url: 'https://your-deployed-url.com/og-image.png', // Replace with your actual OG image
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

async function getSession() {
  const supabase = createServerComponentClient({
    cookies
  })
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-100 p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <a href="/" className="font-bold text-xl">E-Commerce</a>
            <div>
              {session ? (
                <a href="/profile" className="ml-4">Profile</a>
              ) : (
                <a href="/login" className="ml-4">Login</a>
              )}
              <a href="/cart" className="ml-4">Cart</a>
            </div>
          </nav>
        </header>
        <main className="container mx-auto py-8">
          {children}
        </main>
        <footer className="bg-gray-100 p-4 text-center">
          &copy; 2024 E-Commerce
        </footer>
      </body>
    </html>
  )
}