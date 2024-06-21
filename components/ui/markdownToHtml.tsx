import { marked } from 'marked';

const MarkdownToHtml = async (markdown: string): Promise<string> => {
    return marked(markdown);
};

export default MarkdownToHtml;
