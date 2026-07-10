import { NextResponse } from 'next/server';
import { db } from '@/db';
import { reports } from '@/db/schema';
import { getUser } from '@/lib/supabase/server';

export async function GET() {
  try {
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userReports = await db.select().from(reports).orderBy(reports.createdAt).limit(50);
    
    return NextResponse.json({ reports: userReports });
  } catch (error) {
    console.error('Failed to fetch reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { category, description, latitude, longitude, address, imageUrl, isAnonymous } = body;

    if (!category || !description || !latitude || !longitude) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newReport = await db.insert(reports).values({
      userId: user.id,
      category,
      description,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      address: address || null,
      imageUrl: imageUrl || null,
      isAnonymous: isAnonymous || false,
    }).returning();

    return NextResponse.json({ report: newReport[0] }, { status: 201 });
  } catch (error) {
    console.error('Failed to create report:', error);
    return NextResponse.json(
      { error: 'Failed to create report' },
      { status: 500 }
    );
  }
}
