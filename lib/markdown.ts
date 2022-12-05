import { remark } from "remark";
import remarkHtml from "remark-html";

export default async function markdownToHtml (content: string) {
    const result = await remark().use(remarkHtml).process(content)
    return result.toString()
}