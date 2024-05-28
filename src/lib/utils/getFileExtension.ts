export function getFileExtension(fileName: string) {
	const lastDotIndex = fileName.lastIndexOf('.');
	return lastDotIndex !== -1 ? fileName.substring(lastDotIndex + 1) : '';
}
