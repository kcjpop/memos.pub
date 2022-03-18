import { AppErrorBase } from "@/lib/app/error/base";
import { BlogGitHubDir, BlogGitHubDirComponent } from "../dir";
import { BlogGitHubFile } from "../file";
import { BlogGitHubRequest, BlogGitHubResponse } from "../type";
import { BlogGitHubBreadcrumb } from "./breadcrumb";
import { BlogGitHubFavicon } from "./favicon";

interface BaseProps<R> {
	request: R;
	response: BlogGitHubResponse;
}
export type BlogGitHubPageBaseProps<R> = BaseProps<R>;

export type BlogGitHubPageProps = BaseProps<BlogGitHubRequest>;

type Component<R> = (props: BaseProps<R>) => JSX.Element;
export type BlogGitHubPageComponent<R> = Component<R>;

interface MakeProps<R> {
	BlogGitHubDir: BlogGitHubDirComponent<R>;
}

export const makeBlogGitHubPage = <R,>(props: MakeProps<R>) => {
	const { BlogGitHubDir } = props;
	const BlogGitHubPage: Component<R> = (props) => {
		const { request, response } = props;
		return (
			<div>
				{/* <BlogGitHubFavicon request={request} />
				<BlogGitHubBreadcrumb request={request} /> */}
				<div className="mt-16">
					{response.type === "file" ? (
						<BlogGitHubFile file={response} />
					) : response.type === "dir" ? (
						<BlogGitHubDir request={request} dir={response} />
					) : (
						<AppErrorBase title={response.status.toString()}>
							{response.message}
						</AppErrorBase>
					)}
				</div>
			</div>
		);
	};
	return BlogGitHubPage;
};

export const BlogGitHubPage = makeBlogGitHubPage<BlogGitHubRequest>({
	BlogGitHubDir,
});
