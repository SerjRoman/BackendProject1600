import { writeFile } from "fs/promises";
import { join } from "path";

interface IUploadImageOutput {
	fileName: string;
}

export async function uploadImage(base64: string): Promise<IUploadImageOutput> {
	if (!base64.startsWith("data:image/png;base64")) return { fileName: base64 };
	const fileName = `avatar-${Date.now()}.png`;

	const buffer = Buffer.from(
		base64.replace("data:image/png;base64,", ""),
		"base64"
	);
	try {
		await writeFile(
			join(__dirname, "../", "../", "./media", fileName),
			buffer
		);
	} catch (error) {
		console.log(error);
	}
	return { fileName };
}
