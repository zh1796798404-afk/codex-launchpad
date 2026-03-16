import { redirect } from "next/navigation";
import { SetupBanner } from "@/components/setup-banner";
import { requireAdminSession } from "@/lib/auth";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();

  if (session.setupRequired) {
    return (
      <main className="shell page-section">
        <SetupBanner />
      </main>
    );
  }

  if (!session.user) {
    redirect("/login");
  }

  if (!session.isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}
