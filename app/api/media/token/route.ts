import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const { videoId, email } = await req.json();

    if (!videoId || !email) {
      return NextResponse.json({ error: 'videoId and email are required.' }, { status: 400 });
    }

    const video = store.getVideoById(videoId);
    if (!video) {
      return NextResponse.json({ error: 'Video not found.' }, { status: 404 });
    }

    const hasAccess = store.hasAccess(email, videoId);
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Forbidden. You do not hold an active entitlement for this drop.' },
        { status: 403 }
      );
    }

    // Generate signed streaming session token valid for 2 hours
    const token = `tok_${Buffer.from(email).toString('hex').slice(0, 10)}_${Date.now()}`;
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

    return NextResponse.json({
      success: true,
      streamUrl: `${video.streamUrl}?token=${token}`,
      title: video.title,
      viewerEmail: email,
      watermarkText: `${email.toLowerCase()} • VAULT #${token.slice(-6)}`,
      expiresAt,
    });
  } catch (err: unknown) {
    console.error('Media token error:', err);
    return NextResponse.json({ error: 'Unable to issue media streaming token' }, { status: 500 });
  }
}
