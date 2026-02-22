import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import Statistic from '@/models/Statistic';
import { isAdmin } from '@/lib/auth';

export async function GET() {
  if (!await isAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const stats = await Statistic.find({});

    // Transform to a more usable object
    const statsObject = stats.reduce((acc: Record<string, number>, stat) => {
      acc[stat.name] = stat.value;
      return acc;
    }, {});

    return NextResponse.json(statsObject);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
