// src/lib/aws.js
import {
	S3_ACCESS_KEY_ID,
	S3_BUCKET_NAME,
	S3_REGION,
	S3_SECRET_ACCESS_KEY
} from '$env/static/private';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { Buffer } from 'buffer';

const s3Client = new S3Client({
	region: S3_REGION, // ex) 'ap-northeast-2'
	credentials: {
		accessKeyId: S3_ACCESS_KEY_ID,
		secretAccessKey: S3_SECRET_ACCESS_KEY
	}
});

export async function uploadToS3(file: Buffer, key: string): Promise<string | unknown> {
	const uploadParams = {
		Bucket: S3_BUCKET_NAME,
		Key: key,
		Body: file
	};

	try {
		// Upload the file to S3
		await s3Client.send(new PutObjectCommand(uploadParams));

		// Get the pre-signed URL for the uploaded object
		const getObjectParams = {
			Bucket: S3_BUCKET_NAME,
			Key: key
		};
		const uploadUrl = await getSignedUrl(s3Client, new GetObjectCommand(getObjectParams), {
			expiresIn: 3600
		});

		return uploadUrl;
	} catch (err) {
		console.log('Error uploading file', err);
		return err;
	}
}
