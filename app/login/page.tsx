import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <main className="shell auth-shell">
      <AuthForm mode="login" />
    </main>
  );
}
