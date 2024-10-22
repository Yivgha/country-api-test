import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const countryCode = url.pathname.split('/').pop();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries/${countryCode}`
  );

  if (!response.ok) {
    return NextResponse.json({ error: 'Country not found' }, { status: 404 });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
