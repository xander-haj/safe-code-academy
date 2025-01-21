import { marked } from "marked";
import DOMPurify from "dompurify";

interface LessonContentProps {
  content: string;
}

const LessonContent = ({ content }: LessonContentProps) => {
  // Configure marked to use synchronous parsing and ensure it returns a string
  const rawHtml = marked.parse(content, { async: false }) as string;
  
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