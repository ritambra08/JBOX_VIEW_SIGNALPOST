import "./globals.css"
import {Public_Sans} from 'next/font/google';
import {getDirectory} from '@/lib/data';
import {SiteShell} from '@/components/site/site-shell';
const font=Public_Sans({subsets:['latin'],weight:['400','600','800'],variable:'--font-public'});
export const metadata={title:{default:'Signalpost — Norwegian companies, fact by fact',template:'%s | Signalpost'},description:'Check Norwegian companies. Find, compare and trace every fact to its source.',openGraph:{title:'Signalpost',description:'Every fact shows where it came from.',type:'website'}};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={font.variable}>
        <SiteShell index={await getDirectory()}>{children}</SiteShell>
      </body>
    </html>
  )
}
