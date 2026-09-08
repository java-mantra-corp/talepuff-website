import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Waitlist sign-up: one email per submission to the support inbox. No database, no third
 * party, nothing stored on Vercel. With SMTP unset the route says 503 and the form falls
 * back to a mailto link.
 */
export async function POST(req: Request) {
  let email = "";
  try {
    const body = (await req.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: "that does not look like an email address" }, { status: 422 });
  }

  const host = process.env.MAIL_HOST;
  const user = process.env.MAIL_USERNAME;
  const pass = process.env.MAIL_PASSWORD;
  const to = process.env.SUPPORT_INBOX || user;
  if (!host || !user || !pass || !to) {
    return NextResponse.json({ error: "waitlist not open" }, { status: 503 });
  }

  const port = Number(process.env.MAIL_PORT || 465);
  const transport = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  try {
    await transport.sendMail({
      from: `Talepuff website <${user}>`,
      to,
      subject: `Waitlist: ${email}`,
      text: `${email} asked to be told when Talepuff ships.\n\n${new Date().toISOString()}`,
    });
  } catch {
    return NextResponse.json({ error: "could not send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
