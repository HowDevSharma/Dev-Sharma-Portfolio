import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Here you would normally send to email service/CRM
    // For now, just log to console (in production, replace with actual service)
    console.log('Contact form submission:', body);

    // Return success response
    return NextResponse.json({ ok: true, message: 'Form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ ok: false, message: 'Submission failed' }, { status: 500 });
  }
}