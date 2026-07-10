import { NextResponse } from 'next/server';
import { db } from '@/db';
import { sos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getUser } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const latitude = formData.get('latitude') as string;
    const longitude = formData.get('longitude') as string;
    const address = formData.get('address') as string | null;
    const audioFile = formData.get('audio') as File | null;

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: 'Location is required' },
        { status: 400 }
      );
    }

    let audioUrl: string | null = null;
    
    if (audioFile && audioFile.size > 0) {
      audioUrl = 'pending-upload';
    }

    const newSOS = await db.insert(sos).values({
      userId: user.id,
      latitude,
      longitude,
      address: address || null,
      audioUrl,
      guardianNotified: true,
      status: 'active',
    }).returning();

    return NextResponse.json({ sos: newSOS[0] }, { status: 201 });
  } catch (error) {
    console.error('Failed to create SOS:', error);
    return NextResponse.json(
      { error: 'Failed to create SOS alert' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userSOS = await db.select().from(sos).where(eq(sos.userId, user.id)).orderBy(sos.createdAt).limit(20);
    
    return NextResponse.json({ sos: userSOS });
  } catch (error) {
    console.error('Failed to fetch SOS history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SOS history' },
      { status: 500 }
    );
  }
}
