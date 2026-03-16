"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setMessage("请先配置 Supabase 环境变量，再启用登录注册。");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    try {
      if (mode === "register") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });

        if (error) {
          setMessage(error.message);
          return;
        }

        if (data.session) {
          router.push("/menu");
          router.refresh();
          return;
        }

        setMessage("注册成功。若启用了邮箱验证，请先到邮箱完成确认。");
        event.currentTarget.reset();
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      router.push("/menu");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-card">
      <p className="section-kicker">{mode === "login" ? "欢迎回来" : "创建账号"}</p>
      <h1>{mode === "login" ? "登录后开始点单" : "注册后即可保存订单记录"}</h1>
      <p className="auth-copy">
        {mode === "login"
          ? "用户可以查看订单历史，管理员登录后可进入后台管理菜单与订单。"
          : "普通用户注册后默认为用户角色。管理员账号将在 Supabase 控制台中手动提权。"}
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          <span>邮箱</span>
          <input name="email" placeholder="you@example.com" required type="email" />
        </label>

        <label>
          <span>密码</span>
          <input minLength={6} name="password" placeholder="至少 6 位密码" required type="password" />
        </label>

        <button className="button button-primary" disabled={isSubmitting} type="submit">
          {isSubmitting ? "处理中..." : mode === "login" ? "登录" : "注册"}
        </button>
      </form>

      {message ? <p className="form-message">{message}</p> : null}

      <p className="auth-switch">
        {mode === "login" ? "还没有账号？" : "已经有账号？"}
        <Link href={mode === "login" ? "/register" : "/login"}>
          {mode === "login" ? "去注册" : "去登录"}
        </Link>
      </p>
    </div>
  );
}
