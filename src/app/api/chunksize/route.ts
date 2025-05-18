import { NextResponse } from 'next/server';
import { getCollection } from '@/utils/chroma';

export async function GET() {
  try {
    const collection = await getCollection();
    const all = await collection.get();
    const count = all.ids?.length || 0;

    return NextResponse.json({ count });
  } catch (err) {
    console.error('[Chunk Size Error]', err);
    return NextResponse.json({ error: 'Failed to get chunk size' }, { status: 500 });
  }
}
