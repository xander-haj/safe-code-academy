import { marked } from "marked";
import DOMPurify from "dompurify";

interface LessonContentProps {
  content: string;
}

const LessonContent = ({ content }: LessonContentProps) => {
  const sanitizedHtml = DOMPurify.sanitize(marked(content));

  return (
    <div 
      className="prose prose-slate dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default LessonContent;