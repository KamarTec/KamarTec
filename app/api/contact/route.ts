import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, subject, and message are required.' },
        { status: 400 }
      );
    }

    const { RESEND_API_KEY, CONTACT_RECEIVER_EMAIL } = process.env;
    if (!RESEND_API_KEY || !CONTACT_RECEIVER_EMAIL) {
      console.error('Missing RESEND_API_KEY or CONTACT_RECEIVER_EMAIL in environment variables.');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact us directly.' },
        { status: 503 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const safeName    = escapeHtml(String(name));
    const safeEmail   = escapeHtml(String(email));
    const safePhone   = phone ? escapeHtml(String(phone)) : '';
    const safeSubject = escapeHtml(String(subject));
    const safeMessage = escapeHtml(String(message));

    const { error } = await resend.emails.send({
      from: 'KamarTec Contact Form <contack@kamartec.org>',
      to: [CONTACT_RECEIVER_EMAIL],
      replyTo: safeEmail,
      subject: `[Contact Form] ${safeSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #374151;">
          <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Contact Form Message</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">via KamarTec Solutions website</p>
          </div>
          <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280; width: 100px; vertical-align: top;">Name</td>
                <td style="padding: 10px 0; color: #111827; font-weight: 500;">${safeName}</td>
              </tr>
              <tr style="border-top: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280; vertical-align: top;">Email</td>
                <td style="padding: 10px 0; color: #111827;"><a href="mailto:${safeEmail}" style="color: #7c3aed;">${safeEmail}</a></td>
              </tr>
              ${safePhone ? `
              <tr style="border-top: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280; vertical-align: top;">Phone</td>
                <td style="padding: 10px 0; color: #111827;">${safePhone}</td>
              </tr>` : ''}
              <tr style="border-top: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; font-weight: 600; color: #6b7280; vertical-align: top;">Subject</td>
                <td style="padding: 10px 0; color: #111827;">${safeSubject}</td>
              </tr>
            </table>
            <div style="background: white; border-left: 4px solid #7c3aed; padding: 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
              <p style="font-weight: 600; color: #374151; margin: 0 0 12px;">Message</p>
              <p style="color: #6b7280; margin: 0; white-space: pre-wrap; line-height: 1.7;">${safeMessage}</p>
            </div>
            <p style="font-size: 12px; color: #9ca3af; margin: 0; text-align: center;">
              Sent via KamarTec Solutions contact form · Reply directly to this email to respond
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }

    // Send confirmation to the submitter
    await resend.emails.send({
      from: 'KamarTec Solutions <contact@kamartec.org>',
      to: [safeEmail],
      subject: `Thanks for reaching out, ${safeName}! — KamarTec Solutions`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #374151;">
          <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Thanks for reaching out!</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">KamarTec Solutions — Ghana's Premier Tech Agency</p>
          </div>
          <div style="background: #f9fafb; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
            <p style="color: #374151; font-size: 16px; line-height: 1.7; margin: 0 0 16px;">
              Hi <strong>${safeName}</strong>,
            </p>
            <p style="color: #6b7280; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
              We've received your message and our team will get back to you as soon as possible — usually within 1–2 business days.
            </p>
            <p style="color: #6b7280; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
              In the meantime, feel free to explore our work at <a href="https://kamartec.org" style="color: #7c3aed;">kamartec.org</a>, or reach us directly on WhatsApp at <a href="https://wa.me/233592852555" style="color: #7c3aed;">+233 59 285 2555</a>.
            </p>
            <div style="background: white; border-left: 4px solid #7c3aed; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
              <p style="font-weight: 600; color: #374151; margin: 0 0 4px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Your message</p>
              <p style="color: #9ca3af; margin: 0 0 4px; font-size: 13px;"><strong>Subject:</strong> ${safeSubject}</p>
              <p style="color: #6b7280; margin: 0; font-size: 14px; white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
            </div>
            <p style="color: #374151; font-size: 15px; margin: 0 0 4px;">Warm regards,</p>
            <p style="font-weight: 700; color: #7c3aed; font-size: 16px; margin: 0;">The KamarTec Solutions Team</p>
            <p style="font-size: 12px; color: #9ca3af; margin: 24px 0 0; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 16px;">
              KamarTec Solutions · Legally Registered in Ghana · <a href="https://kamartec.org" style="color: #7c3aed;">kamartec.org</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
