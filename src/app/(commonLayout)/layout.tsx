import Footer from '@/components/shared/Footer';
import PublicNavbar from '@/components/shared/PublicNavbar';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return <div>
    <PublicNavbar />
    {children}
    <Footer />
  </div>

}
