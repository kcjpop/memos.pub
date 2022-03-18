import { BlogPage, BlogPageProps } from "@/lib/blog/page";
import { BlogDir } from "@/lib/blog/type";
import { BlogGitLabDir } from "../dir";
import { BlogGitLabRequest } from "../type";

type Props = BlogPageProps<BlogGitLabRequest>;

const getDir = (request: BlogGitLabRequest, dir: BlogDir): JSX.Element => (
	<BlogGitLabDir dir={dir} request={request} />
);

export const BlogGitLabPage = (props: Props): JSX.Element => (
	<BlogPage
		getDir={getDir}
		request={props.request}
		response={props.response}
	/>
);
