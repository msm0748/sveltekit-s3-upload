# sveltekit s3 파일 업로드

## 설치 방법

```bash
# 폴더 생성
mkdir my-app

# 폴더로 이동
cd my-app

# 깃 코드 가져오기
git clone https://github.com/msm0748/sveltekit-s3-upload.git ./
```

## 실행방법

```bash
npm run dev
```

## 환경 변수 설정

```bash
# 서버에서 쓸 환경변수
S3_ACCESS_KEY_ID={S3 access 키}
S3_SECRET_ACCESS_KEY={S3 access 비밀 키}
S3_BUCKET_NAME={버킷 이름}
S3_REGION=ap-northeast-2 #아시아 태평양(서울)

# 클라이언트에서 쓸 환경변수
PUBLIC_S3_ACCESS_KEY_ID=
PUBLIC_S3_SECRET_ACCESS_KEY=
PUBLIC_S3_BUCKET_NAME=
PUBLIC_S3_REGION=
```

## access 키 발급 방법

[https://celdan.tistory.com/38](https://celdan.tistory.com/38)
