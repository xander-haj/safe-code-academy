import { marked } from "marked";
import DOMPurify from "dompurify";

interface LessonContentProps {
  content: string;
}

const LessonContent = ({ content }: LessonContentProps) => {
  // Use marked.parse() instead of marked() for synchronous parsing
  const sanitizedHtml = DOMPurify.sanitize(marked.parse(content));

  return (
    <div 
      className="prose prose-slate dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default LessonContent;