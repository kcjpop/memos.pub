import { compileMdx } from "@/lib/mdx/compile";
import { components } from "@octokit/openapi-types";
import { resolveBlogGitHubMdxUrl } from "../mdx/url";
import { BlogGitHubFile, BlogGitHubRequest } from "../type";

type RawFile = components["schemas"]["content-file"];

interface Props {
	response: RawFile;
	request: BlogGitHubRequest;
}

export const parseBlogGitHubFile = async (
	props: Props
): Promise<BlogGitHubFile> => {
	const { response, request } = props;

	if (!("content" in response)) throw Error("File doesn't have content");

	const code = await compileMdx<BlogGitHubRequest>({
		content: Buffer.from(response.content, "base64").toString(),
		options: { request, resolveUrl: resolveBlogGitHubMdxUrl },
	});

	return { type: "file", code };
};
