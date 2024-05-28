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

/** 원본 url을 가져옵니다. (보안적으로 좋지 않음) */
function getPublicUrl(key: string): string {
	const bucketUrl = `https://${PUBLIC_S3_BUCKET_NAME}.s3.${S3_REGION}.amazonaws.com`;
	return `${bucketUrl}/${key}`;
}

/** 보안된 URL을 생성하고 반환합니다. */
async function getSignedUrlWithExpiration(
	key: string,
	expirationInSeconds: number
): Promise<string> {
	const getObjectParams = {
		Bucket: PUBLIC_S3_BUCKET_NAME,
		Key: key
	};

	const signedUrl = await getSignedUrl(s3Client, new GetObjectCommand(getObjectParams), {
		// 서명된 URL 생성 함수 (expiresIn 옵션을 설정하여 유효 기간 지정)
		expiresIn: expirationInSeconds
	});
	return signedUrl;
}

export async function uploadToS3(file: File, key: string) {
	const uploadParams = {
		Bucket: PUBLIC_S3_BUCKET_NAME,
		Key: key,
		Body: file
	};

	try {
		await s3Client.send(new PutObjectCommand(uploadParams));

		const uploadUrl = getPublicUrl(key);
		return uploadUrl;
	} catch (err) {
		console.log('Error uploading file', err);
		return err;
	}
}
