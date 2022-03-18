import { AppErrorBase } from "@/lib/app/error/base";
import { BlogFile } from "../file";
import { BlogDir, BlogResponse } from "../type";
// import { BlogGitHubBreadcrumb } from "./breadcrumb";
// import { BlogGitHubFavicon } from "./favicon";

export interface BlogPageProps<R> {
	request: R;
	response: BlogResponse;
}

interface Props<R> extends BlogPageProps<R> {
	getDir: (request: R, dir: BlogDir) => JSX.Element;
}

const Body = <R,>(props: Props<R>): JSX.Element => {
	const { getDir, request, response } = props;
	switch (response.type) {
		case "file":
			return <BlogFile file={response} />;
		case "dir":
			return getDir(request, response);
		case "error":
			return (
				<AppErrorBase title={response.status.toString()}>
					{response.message}
				</AppErrorBase>
			);
	}
};

export const BlogPage = <R,>(props: Props<R>): JSX.Element => (
	<div>
		{/* <BlogGitHubFavicon request={request} />
				<BlogGitHubBreadcrumb request={request} /> */}
		<div className="mt-16">
			<Body {...props} />
		</div>
	</div>
);
