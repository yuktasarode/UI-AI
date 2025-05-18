import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { addToChroma } from '@/utils/chroma';

const pdf = pdfParse;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const blob = formData.get('file');

    if (!blob || !(blob instanceof Blob)) {
      return NextResponse.json({ error: 'No valid file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const parsed = await pdf(buffer);

    const {
      numpages,
      numrender,
      info,
      metadata,
      version,
      text: rawText
    } = parsed;

    const chunks = splitIntoChunks(rawText);
    const count = await addToChroma(chunks);

    return NextResponse.json({
      count,
      numpages,
      numrender,
      info,
      metadata,
      version
    });
  } catch (err) {
    console.error('[PDF Upload Error]', err);
    return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 });
  }
}

function splitIntoChunks(text: string, maxLength = 500): string[] {
  const sentences = text.split(/(?<=[.?!])\s+/);
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    if ((current + sentence).length > maxLength) {
      chunks.push(current.trim());
      current = '';
    }
    current += sentence + ' ';
  }

  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks;
}
