import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    
    // Ensure the uploads directory exists
    const uploadDir = join(process.cwd(), 'public/uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch {
      // Ignore if it already exists
    }

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return the public URL
    const url = `/uploads/${filename}`;
    
    return NextResponse.json({ url, success: true });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
  }
}
