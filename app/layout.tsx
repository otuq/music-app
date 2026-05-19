
import Link from 'next/link';
import "./globals.css"
import QueryProvider from '../src/provider/QueryProvider';
export default function RoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <header className='p-4 border-b'>
          <nav className='flex gap-4'>
            <Link href={"/"}>Home</Link>
            <Link href={"/login"}>Login</Link>
            <Link href={"/search"}>Search</Link>
          </nav>
        </header>
        <QueryProvider>
          <main className='p-10'>{children}</main>
        </QueryProvider>
      </body>
    </html>
  )

}