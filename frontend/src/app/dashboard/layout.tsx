import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { DashboardLayout as Layout } from '@/components/layout/DashboardLayout';

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sb-access-token')?.value;

  if (!sessionToken) {
    redirect('/login');
  }

  return <Layout>{children}</Layout>;
}
