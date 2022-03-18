import Head from "next/head";
import { BlogGitHubRequest } from "../type";

interface Props {
	request: BlogGitHubRequest;
}

export const BlogGitHubFavicon = (props: Props): JSX.Element => (
	<Head>
		<link
			rel="icon"
			href={`https://github.com/${props.request.owner}.png?size=48`}
			type="image/png"
		/>
	</Head>
);
