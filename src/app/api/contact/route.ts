const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Receives the contact-page note. It validates and acknowledges the message
 * but does not deliver it anywhere yet — connect your email or CRM provider
 * (Resend, Postmark, Formspree, a Slack webhook…) where marked below.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { message?: unknown; email?: unknown } | null;
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (message.length < 3 || message.length > 5000) {
    return Response.json({ ok: false, error: "Add a short message (up to 5,000 characters)." }, { status: 400 });
  }
  if (!EMAIL.test(email) || email.length > 254) {
    return Response.json({ ok: false, error: "That email doesn't look quite right." }, { status: 400 });
  }

  // Deliver { email, message } with your provider here.

  return Response.json({ ok: true });
}
