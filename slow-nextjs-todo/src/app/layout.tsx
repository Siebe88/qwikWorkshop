import { Metadata } from 'next';
import './globals.css';
import ThemeRegistry from './theme-registry';

export const metadata: Metadata = {
  title: 'Slow Next.js Todo App',
  description: 'A deliberately slow Next.js Todo App for performance comparison',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
