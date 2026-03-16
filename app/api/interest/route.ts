import { NextResponse } from "next/server";

type InterestPayload = {
  company?: string;
  email?: string;
  launchWindow?: string;
};

const launchWindows = new Set(["today", "this-week", "this-month"]);

export async function POST(request: Request) {
  const body = (await request.json()) as InterestPayload;
  const company = body.company?.trim();
  const email = body.email?.trim().toLowerCase();
  const launchWindow = body.launchWindow?.trim();

  if (!company || company.length < 2) {
    return NextResponse.json(
      { ok: false, message: "Please enter a company or project name." },
      { status: 400 }
    );
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (!launchWindow || !launchWindows.has(launchWindow)) {
    return NextResponse.json(
      { ok: false, message: "Choose a launch window before submitting." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: `Thanks ${company}, your launch brief is ready.`,
    submission: {
      company,
      email,
      launchWindow,
      contactEmail: process.env.CONTACT_EMAIL ?? "hello@example.com",
      receivedAt: new Date().toISOString()
    }
  });
}
