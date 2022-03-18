import { MdxResolveUrl } from "@/lib/mdx/compile/url";
import nodepath from "path";
import { BlogRequest } from "../type";

type Resolve = MdxResolveUrl<BlogRequest>;

/** Rewrite relative url to absolute */
export const resolveBlogMdxUrl: Resolve = (props): string => {
	const { url, request } = props;
	const { owner, repo, path: mdPath } = request;
	const dirname = nodepath.dirname(mdPath);
	const assetPath = nodepath.join(dirname, url);
	const origin = "https://raw.githubusercontent.com";
	return `${origin}/${owner}/${repo}/HEAD/${assetPath}`;
};
