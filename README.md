This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Set up environment variables

Copy the example file and fill in your SMTP credentials:

```bash
cp .env.example .env.local
```

Open `.env.local` and set the following values:

| Variable | Description |
|---|---|
| `SMTP_HOST` | Your outgoing mail server (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port — `587` for STARTTLS (recommended), `465` for SSL |
| `SMTP_SECURE` | `true` for port 465 (implicit TLS), `false` for port 587 |
| `SMTP_USER` | Email address used to authenticate with the SMTP server |
| `SMTP_PASS` | Password or App Password for the SMTP account |
| `CONTACT_RECEIVER_EMAIL` | Inbox where contact form submissions are delivered |

> **Gmail users:** if 2-Step Verification is enabled, generate an **App Password** at
> [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) and use it as `SMTP_PASS`.

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Remember to add your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
