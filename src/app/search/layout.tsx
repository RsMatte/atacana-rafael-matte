import type { Metadata } from 'next';
import './styles.css';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Atacana Group',
  description: 'Search for Pharma Trials',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
