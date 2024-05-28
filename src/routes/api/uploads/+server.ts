import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { uploadToS3 } from '$lib/s3/server';
import { Buffer } from 'buffer';

// Utility function to convert File to Buffer
const fileToBuffer = async (file: File): Promise<Buffer> => {
	const arrayBuffer = await file.arrayBuffer();
	return Buffer.from(arrayBuffer);
};

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('file') as File;

	if (!file) {
		return json({ error: 'No file provided' }, { status: 400 });
	}
	try {
		const buffer = await fileToBuffer(file);
		const result = await uploadToS3(buffer, 'test.jpg');

		return json({ message: 'File uploaded successfully', documents: result });
	} catch (error) {
		console.error('Error uploading file:', error);
		return json({ error: 'Error uploading file' }, { status: 500 });
	}
};
