import DataArticle, { type DataArticleContent } from "./DataArticle";
import content from "../../data/articles/ai-prompt-starter-pack.json";

// Start here (Resources): copy-and-paste prompts for everyday owner jobs.
export default function PromptPackNote() {
  return <DataArticle article={content as DataArticleContent} />;
}
