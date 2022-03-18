import { BlogPage, BlogPageProps } from "@/lib/blog/page";
import { BlogDir } from "@/lib/blog/type";
import { BlogGitHubDir } from "../dir";
import { BlogGitHubRequest } from "../type";

type Props = BlogPageProps<BlogGitHubRequest>;

const getDir = (request: BlogGitHubRequest, dir: BlogDir): JSX.Element => (
	<BlogGitHubDir dir={dir} request={request} />
);

export const BlogGitHubPage = (props: Props): JSX.Element => (
	<BlogPage
		getDir={getDir}
		request={props.request}
		response={props.response}
	/>
);
