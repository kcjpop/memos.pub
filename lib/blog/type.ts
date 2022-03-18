export interface BlogDirEntry {
	type: "file" | "dir";
	name: string;
}

export interface BlogDir {
	type: "dir";
	entries: BlogDirEntry[];
	/**
	 * A dir may have an "index" or "README" file which should be displayed
	 * along the entry list
	 */
	readme: BlogFile | null;
}

export interface BlogFile {
	type: "file";
	code: string;
}

export interface BlogError {
	type: "error";
	status: number;
	message: string;
}

export type BlogResponse = BlogDir | BlogFile | BlogError;

export interface BlogRequestBase {
	path: string;
}

/**
 * Params to get a resource from GitHub
 */
export interface BlogRequest extends BlogRequestBase {
	/** e.g. "thien-do" */
	owner: string;
	/** e.g. "notes" */
	repo: string;
	/** e.g. "dir/foo", "dir/foo/hello.md", "" when at repo root */
	path: string;
}
