import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { TopDisclaimerBanner } from '@/components/TopDisclaimerBanner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  title: 'JanSeva Citizen Portal | Public Services & Grievances',
  description: 'Multilingual citizen-facing public-services assistant, searchable directory, and secure sample grievance tracking.',
  keywords: ['citizen services', 'public services', 'grievance redressal', 'janseva', 'civic assistant']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <LanguageProvider>
          <AuthProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <TopDisclaimerBanner />
              <Header />
              <main id="main-content" style={{ flex: '1 0 auto' }}>
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
