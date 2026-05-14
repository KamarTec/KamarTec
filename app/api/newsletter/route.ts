import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const { RESEND_API_KEY, CONTACT_RECEIVER_EMAIL } = process.env;
    if (!RESEND_API_KEY || !CONTACT_RECEIVER_EMAIL) {
      console.error('Missing RESEND_API_KEY or CONTACT_RECEIVER_EMAIL.');
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 503 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);
    const safeEmail = email.trim().toLowerCase().slice(0, 254);

    // Welcome email to subscriber
    await resend.emails.send({
      from: 'KamarTec Solutions <contact@kamartec.org>',
      to: [safeEmail],
      subject: "You're on the KamarTec list! 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #374151;">
          <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 40px 32px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 26px; font-weight: 700;">Welcome to KamarTec!</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 10px 0 0; font-size: 15px;">Ghana's Premier Tech Agency</p>
          </div>
          <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #374151; font-size: 16px; line-height: 1.7; margin: 0 0 16px;">
              You're now on our newsletter list — exciting things are coming your way.
            </p>
            <p style="color: #6b7280; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
              Expect updates on our latest projects, tech insights from the KamarTec team, and news about what we're building for Ghana and beyond.
            </p>
            <div style="background: linear-gradient(135deg, #7c3aed15, #2563eb15); border: 1px solid #7c3aed30; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px;">
              <p style="font-weight: 600; color: #7c3aed; margin: 0 0 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.06em;">What to expect</p>
              <ul style="color: #6b7280; margin: 0; padding-left: 18px; line-height: 1.8; font-size: 14px;">
                <li>Project launches &amp; case studies</li>
                <li>Tech tips from our developers</li>
                <li>Opportunities to work with us</li>
              </ul>
            </div>
            <div style="text-align: center; margin-bottom: 24px;">
              <a href="https://kamartec.org" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #2563eb); color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                Explore Our Work →
              </a>
            </div>
            <p style="font-size: 12px; color: #9ca3af; margin: 0; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 16px;">
              KamarTec Solutions · Legally Registered in Ghana · <a href="https://kamartec.org" style="color: #7c3aed;">kamartec.org</a><br/>
              You're receiving this because you subscribed at kamartec.org. To unsubscribe, reply "unsubscribe" to this email.
            </p>
          </div>
        </div>
      `,
    });

    // Owner notification
    await resend.emails.send({
      from: 'KamarTec Newsletter <contack@kamartec.org>',
      to: [CONTACT_RECEIVER_EMAIL],
      subject: `New newsletter subscriber: ${safeEmail}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; color: #374151;">
          <div style="background: linear-gradient(135deg, #059669, #047857); padding: 24px 28px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 18px;">New Newsletter Subscriber</h1>
          </div>
          <div style="background: #f9fafb; padding: 24px 28px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #6b7280; margin: 0 0 8px; font-size: 14px;">Email address:</p>
            <p style="color: #111827; font-weight: 600; font-size: 16px; margin: 0 0 16px;">${safeEmail}</p>
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">via KamarTec Solutions newsletter form</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Subscribed successfully.' });
  } catch (err) {
    console.error('Newsletter error:', err);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
