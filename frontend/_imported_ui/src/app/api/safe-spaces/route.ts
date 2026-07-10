import { NextResponse } from 'next/server';
import { db } from '@/db';
import { safeSpaces } from '@/db/schema';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const type = searchParams.get('type');
    const radius = searchParams.get('radius') || '5'; // km

    let query = db.select().from(safeSpaces);

    // Filter by type if specified
    if (type && type !== 'all') {
      // query = query.where(eq(safeSpaces.type, type));
    }

    // TODO: Add geospatial query for radius search
    // This would require PostGIS extension or manual distance calculation

    const spaces = await query.limit(50);
    
    return NextResponse.json({ safeSpaces: spaces });
  } catch (error) {
    console.error('Failed to fetch safe spaces:', error);
    return NextResponse.json(
      { error: 'Failed to fetch safe spaces' },
      { status: 500 }
    );
  }
}
