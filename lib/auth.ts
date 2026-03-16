import type { Profile } from "@/lib/types";
import { hasSupabaseEnv } from "@/lib/env";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function getCurrentSession() {
  if (!hasSupabaseEnv) {
    return { user: null, profile: null as Profile | null, setupRequired: true };
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return { user: null, profile: null as Profile | null, setupRequired: true };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null as Profile | null, setupRequired: false };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, role, created_at")
    .eq("id", user.id)
    .maybeSingle();

  return {
    user,
    profile: profile ?? {
      id: user.id,
      email: user.email ?? "",
      role: "user"
    },
    setupRequired: false
  };
}

export async function requireAdminSession() {
  const session = await getCurrentSession();
  return {
    ...session,
    isAdmin: session.profile?.role === "admin"
  };
}
