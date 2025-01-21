import { marked } from "marked";
import DOMPurify from "dompurify";

interface LessonContentProps {
  content: string;
}

const LessonContent = ({ content }: LessonContentProps) => {
  // Configure marked to use synchronous parsing
  marked.setOptions({
    async: false
  });
  
  // Parse markdown to HTML synchronously
  const rawHtml = marked.parse(content);
  
  // Sanitize the HTML
  const sanitizedHtml = DOMPurify.sanitize(rawHtml);

  return (
    <div 
      className="prose prose-slate dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default LessonContent;