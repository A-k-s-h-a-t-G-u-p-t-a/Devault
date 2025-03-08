import axios from "axios";

const GITHUB_API_BASE = "https://api.github.com/repos";

export async function fetchReadme(owner: string, repo: string) {
  try {
    const response = await axios.get(`${GITHUB_API_BASE}/${owner}/${repo}/readme`, {
      headers: { Accept: "application/vnd.github.v3.raw" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching README:", error);
    return null;
  }
}

export async function fetchIssues(owner: string, repo: string) {
  try {
    const response = await axios.get(`${GITHUB_API_BASE}/${owner}/${repo}/issues`, {
      headers: { Accept: "application/vnd.github.v3+json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching issues:", error);
    return [];
  }
}
