import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateSummary(readme: string, issues: any[]) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const issueDetails = issues
      .map((issue) => `Title: ${issue.title}\nDescription: ${issue.body}\n`)
      .join("\n");

    const prompt = `
      Here is the README.md of a project:
      ${readme}

      Here are some open issues:
      ${issueDetails}

      Based on this, generate a structured report with:
      -**Provide the response using proper headings, spacing, and markdown. Also add line spacing.**
      - **Project Overview**
      - **Setup Instructions**
      - **Key Dependencies**
      - **Issue Breakdown with Possible Fixes**
      - **Additional Recommendations**
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating summary:", error);
    return null;
  }
}
