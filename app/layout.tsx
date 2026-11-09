import type { Metadata, Viewport } from "next"
import { Bangers, Comic_Neue } from "next/font/google"
import "./globals.css"

const bangers = Bangers({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-bangers" })
const comicNeue = Comic_Neue({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-comic-neue" })

export const metadata: Metadata = {
  title: "Ultraclickcounter",
  description: "Klikací hra v komiksovém stylu – klikej na gauč, sbírej achievementy a odemykej dovednosti.",
}

export const viewport: Viewport = {
  themeColor: "#fed90f",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" className={`${bangers.variable} ${comicNeue.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
