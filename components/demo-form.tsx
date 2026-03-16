"use client";

import { FormEvent, useState } from "react";

type ApiState =
  | { status: "idle"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialState: ApiState = {
  status: "idle",
  message: "Submit the form to verify your server route before deploying."
};

export function DemoForm() {
  const [state, setState] = useState<ApiState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      launchWindow: String(formData.get("launchWindow") ?? "")
    };

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !data.ok) {
        setState({
          status: "error",
          message: data.message ?? "The API route rejected the request."
        });
        return;
      }

      setState({
        status: "success",
        message: data.message ?? "Your request completed successfully."
      });
      event.currentTarget.reset();
    } catch {
      setState({
        status: "error",
        message: "The request failed. Make sure the app is running locally or deployed."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="form-card" id="launch-form">
      <p className="section-label">API smoke test</p>
      <h2>Use the built-in route before you deploy</h2>
      <p className="form-intro">
        This form posts to <code>/api/interest</code>. If it works locally, the same route will
        work on Vercel after you configure environment variables.
      </p>

      <form className="demo-form" onSubmit={handleSubmit}>
        <label>
          <span>Company or project</span>
          <input name="company" placeholder="Northwind Studio" required />
        </label>

        <label>
          <span>Email</span>
          <input name="email" type="email" placeholder="founder@example.com" required />
        </label>

        <label>
          <span>Preferred launch window</span>
          <select defaultValue="" name="launchWindow" required>
            <option disabled value="">
              Select a timeline
            </option>
            <option value="today">Today</option>
            <option value="this-week">This week</option>
            <option value="this-month">This month</option>
          </select>
        </label>

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Checking route..." : "Submit test request"}
        </button>
      </form>

      <div className={`status-box status-${state.status}`}>{state.message}</div>
    </section>
  );
}
