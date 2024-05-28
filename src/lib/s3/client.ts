// src/lib/aws.js
import {
	PUBLIC_S3_ACCESS_KEY_ID,
	PUBLIC_S3_BUCKET_NAME,
	PUBLIC_S3_REGION,
	PUBLIC_S3_SECRET_ACCESS_KEY
} from '$env/static/public';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
	region: PUBLIC_S3_REGION, // ex) 'ap-northeast-2'
	credentials: {
		accessKeyId: PUBLIC_S3_ACCESS_KEY_ID,
		secretAccessKey: PUBLIC_S3_SECRET_ACCESS_KEY
	}
});

export async function uploadToS3(file: File, key: string) {
	const uploadParams = {
		Bucket: PUBLIC_S3_BUCKET_NAME,
		Key: key,
		Body: file
	};

	try {
		// Upload the file to S3
		await s3Client.send(new PutObjectCommand(uploadParams));

		// Get the pre-signed URL for the uploaded object
		const getObjectParams = {
			Bucket: PUBLIC_S3_BUCKET_NAME,
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
