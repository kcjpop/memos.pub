import { makeBlogPage } from "@/lib/blog/page";
import { BlogResponse } from "@/lib/blog/type";
import { BlogGitLabDir } from "../dir";
import { BlogGitLabRequest } from "../type";

export interface BlogGitLabPageProps {
	request: BlogGitLabRequest;
	response: BlogResponse;
}

export const BlogGitLabPage = makeBlogPage<BlogGitLabRequest>({
	BlogDir: BlogGitLabDir,
});
