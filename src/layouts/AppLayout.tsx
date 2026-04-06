import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { AppHeader } from '@/components/AppHeader';
import { MobileNavBar } from '@/components/MobileNavBar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="lg:pl-[260px]">
        <AppHeader />
        <main className="p-4 pb-20 lg:p-6 lg:pb-6">
          <Outlet />
        </main>
      </div>
      <MobileNavBar />
    </div>
  );
}
