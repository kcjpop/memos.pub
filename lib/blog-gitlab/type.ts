import { BlogRequestBase } from "../blog/type";

/**
 * Params to get a resource from GitLab
 */
export interface BlogGitlabRequest extends BlogRequestBase {
	/** path to project */
	project: string;
	/** path to resource, "" when at repo root */
	path: string;
	/** The name of branch, tag or commit, HEAD when none defined */
	ref: string;
	type: "tree" | "blob";
}
