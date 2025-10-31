import Footer from '@/components/shared/Footer';
import PublicNavbar from '@/components/shared/PublicNavbar';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return <div>
    <PublicNavbar />
    <div className='flex flex-col items-center'>
      {children}
    </div>
    <Footer />
  </div>

}
