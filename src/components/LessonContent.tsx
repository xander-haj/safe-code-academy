import { marked } from "marked";
import DOMPurify from "dompurify";

interface LessonContentProps {
  content: string;
}

const LessonContent = ({ content }: LessonContentProps) => {
  // Configure marked to use synchronous parsing and ensure it returns a string
  const rawHtml = marked.parse(content, { async: false }) as string;
  
  // Configure DOMPurify with strict security settings
  const purifyConfig = {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'p', 'div', 'span', 'a', 'ul', 'ol', 
      'li', 'code', 'pre', 'strong', 'em',
      'blockquote', 'hr'
    ],
    ALLOWED_ATTR: ['class', 'id', 'href'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'form', 'input'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  };

  // Sanitize the HTML with our security configuration
  const sanitizedHtml = DOMPurify.sanitize(rawHtml, purifyConfig);

  return (
    <div 
      className="prose prose-slate dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default LessonContent;