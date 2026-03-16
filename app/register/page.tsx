import { AuthForm } from "@/components/auth/auth-form";

export default function RegisterPage() {
  return (
    <main className="shell auth-shell">
      <AuthForm mode="register" />
    </main>
  );
}
