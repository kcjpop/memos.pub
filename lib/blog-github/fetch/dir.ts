import { components } from "@octokit/openapi-types";
import nodepath from "path";
import { BlogGitHubDir, BlogGitHubDirEntry, BlogGitHubRequest } from "../type";
import { filterBlogGitHubDirEntry } from "./dir-filter";
import { findBlogGitHubDirReadme } from "./dir-readme";
import { fetchBlogGitHub } from "./index";

type RawDir = components["schemas"]["content-directory"];
type RawDirEntry = RawDir[number];

const ensureDirEntryType = (
	type: string
): type is BlogGitHubDirEntry["type"] => {
	return ["file", "dir"].includes(type);
};

const toDirEntry = (raw: RawDirEntry): BlogGitHubDirEntry | null => {
	// Just skip unknown file types (submodule, symlink)
	if (!ensureDirEntryType(raw.type)) return null;
	return { name: raw.name, type: raw.type };
};

const fetchReadme = async (
	request: BlogGitHubRequest,
	entries: BlogGitHubDir["entries"]
): Promise<BlogGitHubDir["readme"]> => {
	const readme = findBlogGitHubDirReadme(entries);
	if (readme === null) return null;
	const path = nodepath.join(request.path, readme.name);
	const file = await fetchBlogGitHub({ ...request, path });
	if (file.type !== "file") throw Error("README file is not file (2)");
	return file;
};

interface Props {
	request: BlogGitHubRequest;
	response: RawDir;
}

export const parseBlogGitHubDir = async (
	props: Props
): Promise<BlogGitHubDir> => {
	const { request, response } = props;
	const raw = response.map(toDirEntry);
	const entries = filterBlogGitHubDirEntry(raw);
	const readme = await fetchReadme(request, entries);
	const dir: BlogGitHubDir = { type: "dir", entries, readme };
	return dir;
};
