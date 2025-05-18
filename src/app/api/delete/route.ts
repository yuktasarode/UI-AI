
'use server'
import { NextResponse } from 'next/server';
import { deleteAllFromChroma } from '@/utils/chroma';



export async function POST() {
  try {
    await deleteAllFromChroma();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Delete Error]', error);
    return NextResponse.json({ error: 'Failed to delete Chroma data' }, { status: 500 });
  }
}
