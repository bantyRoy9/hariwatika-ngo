import { requireAdmin } from "@/lib/auth";
import { LENITY } from "@/theme/lenity";
import Sidebar from "../_components/Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen flex" style={{ background: LENITY.adminBg }}>
      <Sidebar />
      <main className="flex-1 min-w-0 lg:ml-64">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</div>
      </main>
    </div>
  );
}
