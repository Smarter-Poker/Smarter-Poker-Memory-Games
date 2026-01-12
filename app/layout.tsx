import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Memory Matrix | Orb #5',
    description: 'GTO Range Training - Neural Link Established',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
