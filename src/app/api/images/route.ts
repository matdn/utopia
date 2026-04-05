import { NextResponse } from 'next/server';
import galleryData from '@/data/gallery.json';

export async function GET() {
  try {
    return NextResponse.json({ images: galleryData.images });
  } catch (error) {
    return NextResponse.json({ images: [], error: 'Failed to read images' }, { status: 500 });
  }
}
