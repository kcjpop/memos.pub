import Head from "next/head";
import * as type from "../type";

export type GetBlogDirTitle<R> = (props: {
	dir: type.BlogDir;
	request: R;
}) => string;

interface Props<R> {
	getTitle: GetBlogDirTitle<R>;
	dir: type.BlogDir;
	request: R;
}

export const BlogDirOverview = <R,>(props: Props<R>): JSX.Element => {
	const { dir, getTitle, request } = props;
	const title = getTitle({ dir, request });
	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>
			<h1>{title}</h1>
		</div>
	);
};
