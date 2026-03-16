import { DemoForm } from "@/components/demo-form";

const deploymentSteps = [
  "Push the code to GitHub from the current branch.",
  "Import the repository into Vercel and confirm the detected Next.js settings.",
  "Copy the values from .env.example into Vercel project environment variables.",
  "Deploy once, then share the generated vercel.app URL with test users.",
  "Bind your own domain when you are ready for public release."
];

const highlights = [
  {
    title: "Full-stack by default",
    description:
      "The landing page and API route live in one project, so Vercel can build and deploy everything together."
  },
  {
    title: "Friendly deployment path",
    description:
      "GitHub remains the source of truth. Every push can create a fresh preview or update production without server maintenance."
  },
  {
    title: "Environment-ready",
    description:
      "Secret values stay in local or Vercel environment variables instead of being hard-coded into the repo."
  }
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Deployable from day one</p>
          <h1>Ship a polished web app with Codex, GitHub, and Vercel.</h1>
          <p className="lede">
            This starter gives you a real homepage, a working API route, and a clean deployment
            checklist so non-technical users can open a live link instead of asking for local setup.
          </p>

          <div className="hero-actions">
            <a className="primary-link" href="#launch-form">
              Try the live API
            </a>
            <a className="secondary-link" href="#deploy-checklist">
              Review the launch steps
            </a>
          </div>
        </div>

        <div className="hero-panel">
          <div className="panel-topline">
            <span>Launch sequence</span>
            <span>GitHub - Vercel</span>
          </div>
          <div className="stat-grid">
            <article>
              <strong>1 repo</strong>
              <p>Front end and API routes deploy together.</p>
            </article>
            <article>
              <strong>0 servers</strong>
              <p>No manual VM setup, patching, or process manager required.</p>
            </article>
            <article>
              <strong>Fast previews</strong>
              <p>Each push can become a shareable preview build for review.</p>
            </article>
            <article>
              <strong>Safe secrets</strong>
              <p>Production keys live in Vercel environment settings, not git history.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="highlight-grid">
        {highlights.map((item) => (
          <article className="highlight-card" key={item.title}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <div className="checklist-card" id="deploy-checklist">
          <p className="section-label">Deployment checklist</p>
          <h2>Everything you need before sharing the link</h2>
          <ol>
            {deploymentSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>

        <DemoForm />
      </section>
    </main>
  );
}
