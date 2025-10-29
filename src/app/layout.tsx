import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TypeAssist - OCR Text Recognition',
  description: 'Advanced OCR-powered text recognition application with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
