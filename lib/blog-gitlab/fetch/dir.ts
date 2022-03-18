import { filterBlogDirEntry } from "@/lib/blog/fetch/dir-filter";
import { findBlogDirReadme } from "@/lib/blog/fetch/dir-readme";
import { BlogDir, BlogDirEntry, BlogFile } from "@/lib/blog/type";
import nodepath from "path";
import { BlogGitlabRequest } from "../type";
import { fetchBlogGitlabFile } from "./file";

interface RawItem {
	name: string;
	type: string;
}

type RawResponse = RawItem[];

const getEntryType = (raw: string): BlogDirEntry["type"] => {
	switch (raw) {
		case "blob":
			return "file";
		case "tree":
			return "dir";
	}
	throw Error(`Unknown type: "${raw}`);
};

const fetchReadme = async (
	request: BlogGitlabRequest,
	entries: BlogDirEntry[]
): Promise<BlogFile | null> => {
	const readme = findBlogDirReadme(entries);
	if (readme === null) return null;
	const path = nodepath.join(request.path, readme.name);
	const file = await fetchBlogGitlabFile({ ...request, path });
	return file;
};

const parse = async (
	request: BlogGitlabRequest,
	raw: RawResponse
): Promise<BlogDir> => {
	// Entries
	let entries: BlogDirEntry[] = raw.map((item) => ({
		name: item.name,
		type: getEntryType(item.type),
	}));
	entries = filterBlogDirEntry(entries);
	// Readme
	const readme = await fetchReadme(request, entries);
	const dir: BlogDir = { type: "dir", readme, entries };
	return dir;
};

// https://gitlab.com/api/v4/projects/gitlab-org%2Fgitlab/repository/tree/?path=doc&ref=master
const fetchRaw = async (request: BlogGitlabRequest): Promise<RawResponse> => {
	const { project, path, ref } = request;
	const url = [
		"https://gitlab.com/api/v4/projects",
		`/${encodeURIComponent(project)}`,
		"/repository/tree",
		`?path=${encodeURIComponent(path)}`,
		`&ref=${ref}`,
		`&per_page=100`,
	].join("");
	console.log({ url });
	const response = await fetch(url);
	const raw = (await response.json()) as RawResponse;
	return raw;
};

export const fetchBlogGitlabDir = async (
	request: BlogGitlabRequest
): Promise<BlogDir> => {
	const raw = await fetchRaw(request);
	const dir = await parse(request, raw);
	return dir;
};
