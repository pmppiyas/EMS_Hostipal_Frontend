import PublicNavbar from '@/components/shared/PublicNavbar';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return <div>
    <PublicNavbar />
    {children}
    <h3>Footer</h3>
  </div>

}
