import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AgeGateModal from '@/components/AgeGateModal';

export const metadata: Metadata = {
  title: 'VAULT by DB — Private Creator Storefront & VIP Club',
  description: 'Exclusive 4K drops, behind-the-scenes archives, and VIP membership direct from creator DB.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-background text-text-primary">
      <body className="min-h-screen flex flex-col bg-background antialiased selection:bg-gold selection:text-black">
        <AgeGateModal />
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
