const {Octokit} = require("@octokit/rest");

const getRepoContent = async (path) => {
    const octokit = new Octokit();
    try {
        return await octokit.repos.getContent({
            owner: process.env.GITHUB_LESSON_REPO_OWNER,
            repo: process.env.GITHUB_LESSON_REPO,
            path: path,
        });
    } catch {
        console.log(`Path not found: ${path}`);
        return null;
    }
}
export default getRepoContent;
