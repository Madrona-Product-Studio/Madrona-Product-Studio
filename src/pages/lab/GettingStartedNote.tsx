import DataArticle, { type DataArticleContent } from "./DataArticle";
import content from "../../data/articles/getting-started-with-ai.json";

// Start here (Resources): the plain-language guide for owners.
export default function GettingStartedNote() {
  return <DataArticle article={content as DataArticleContent} />;
}
