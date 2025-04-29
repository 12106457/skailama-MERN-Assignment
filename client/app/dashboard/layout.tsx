// dashboard/layout.tsx

import Header from "@/app/component/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      <Header />
      <main className="px-10">{children}</main> {/* add padding if you want */}
    </div>
  );
}
