import * as fs from 'fs';
import * as path from 'path';

export function liverpoolSearchResult(): string {
	return getTestDataFileContent('liverpoolSearchResult.xml');
}

export function ipswichSearchResult(): string {
	return getTestDataFileContent('ipswichSearchResult.xml');
}

export function messiSearchResult(): string {
	return getTestDataFileContent('messiSearchResult.xml');
}

function getTestDataFileContent(filename: string): string {
	const content = fs.readFileSync(path.join(__dirname, filename));
	return content.toString();
}
