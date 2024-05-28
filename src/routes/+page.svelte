<script lang="ts">
	import { uploadToS3 } from '$lib/s3/client';

	let file: FileList | null = null;

	let fileSrc: string;

	const handleAPIUpload = async () => {
		const formData = new FormData();
		if (!file) return;
		formData.append('file', file[0]);

		const response = await fetch('/api/uploads', {
			method: 'POST',
			body: formData
		});

		const data = await response.json();

		fileSrc = data.documents;
	};

	const handleClientUpload = async () => {
		if (!file) return;
		const key = `uploads/${file[0].name}`;

		const result = await uploadToS3(file[0], key);

		if (typeof result === 'string') fileSrc = result;
	};
</script>

<h1>Upload</h1>
{#if fileSrc}
	<img src={fileSrc} alt="uploaded image" />
{/if}
<input type="file" bind:files={file} />
<button on:click={handleAPIUpload}>서버 API를 통한 업로드</button>
<button on:click={handleClientUpload}>클라이언트에서 업로드</button>
