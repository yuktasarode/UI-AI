// types/pdf-parse.d.ts
declare module 'pdf-parse/lib/pdf-parse.js' {
  import { Buffer } from 'buffer';

  interface PDFMetadata {
    metadata: {
      get: (key: string) => string;
    };
  }

  interface PDFInfo {
    Title?: string;
    Author?: string;
    Creator?: string;
    Producer?: string;
    CreationDate?: string;
    ModDate?: string;
    [key: string]: any;
  }

  interface PDFParseResult {
    numpages: number;
    numrender: number;
    info: PDFInfo;
    metadata: PDFMetadata | null;
    version: string;
    text: string;
  }

  export default function pdf(buffer: Buffer): Promise<PDFParseResult>;
}
