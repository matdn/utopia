import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import imagesInfo from '@/data/images-info.json';

export async function GET() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public', 'images');
    
    // Read all files in the images directory
    const files = fs.readdirSync(imagesDirectory);
    
    // Filter only image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    });
    
    // Map to include full path and info from JSON
    const images = imageFiles.map((file, index) => {
      const info = imagesInfo.images[file as keyof typeof imagesInfo.images] || {
        title: file.replace(/\.[^/.]+$/, ''),
        location: 'Unknown',
        date: 'Date inconnue',
        description: ''
      };
      
      return {
        id: index + 1,
        src: `/images/${file}`,
        title: info.title,
        location: info.location,
        date: info.date,
        description: 'description' in info ? info.description : '',
        category: 'Photo'
      };
    });
    
    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ images: [], error: 'Failed to read images' }, { status: 500 });
  }
}
