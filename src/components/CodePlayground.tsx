import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CodePlaygroundProps {
  code: string;
  onChange: (value: string) => void;
  language: string;
  content?: string;
}

const CodePlayground = ({ code, onChange, language, content = "" }: CodePlaygroundProps) => {
  const [output, setOutput] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Extract code from content's code blocks if available
    if (content) {
      const codeBlockRegex = /```(?:html|css|javascript)\n([\s\S]*?)```/;
      const match = content.match(codeBlockRegex);
      if (match && match[1]) {
        console.log("Found code block in lesson content:", match[1]);
        onChange(match[1].trim());
      }
    }
  }, [content, onChange]);

  // Reset iframe when code changes
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = '';
      console.log("Reset iframe with new code:", code);
    }
  }, [code]);

  const runCode = () => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    
    // Create a configuration object for DOMPurify
    const purifyConfig = {
      ALLOWED_TAGS: ['html', 'head', 'body', 'style', 'h1', 'h2', 'h3', 'p', 'div', 'span', 'a', 'ul', 'li', 'button'],
      ALLOWED_ATTR: ['class', 'id', 'style', 'href'],
      ADD_TAGS: ['script'], // Allow script tags but with restrictions
      FORBID_TAGS: ['iframe', 'object', 'embed'], // Prevent nested iframes and objects
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'], // Prevent event handlers
    };

    // Sanitize the code
    const sanitizedCode = DOMPurify.sanitize(code, purifyConfig);

    // Create a safe environment for HTML/CSS/JS execution
    const safeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta http-equiv="Content-Security-Policy" 
                content="default-src 'self' 'unsafe-inline'; 
                         img-src 'self' data: https:; 
                         style-src 'self' 'unsafe-inline';">
          <style>
            /* Reset default styles */
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { padding: 1rem; }
          </style>
        </head>
        <body>
          ${sanitizedCode}
          <script>
            // Sandbox the environment
            (function() {
              // Prevent access to sensitive APIs
              delete window.localStorage;
              delete window.sessionStorage;
              delete window.indexedDB;
              delete window.openDatabase;
              window.fetch = null;
              window.XMLHttpRequest = null;
              
              // Prevent access to parent window
              window.parent = null;
              window.top = null;
              
              // Prevent eval and similar functions
              window.eval = null;
              window.Function = null;
              
              // Log execution
              console.log = function() {
                window.parent.postMessage({
                  type: 'log',
                  data: Array.from(arguments)
                }, '*');
              };
            })();
          </script>
        </body>
      </html>
    `;

    // Update iframe content with sanitized and secured HTML
    iframe.srcdoc = safeHtml;
    console.log("Updated iframe with sanitized code");

    // Listen for console logs from the iframe
    window.addEventListener('message', (event) => {
      if (event.data?.type === 'log') {
        console.log('Sandbox output:', ...event.data.data);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Code Editor</h2>
        <Button onClick={runCode}>Run Code</Button>
      </div>
      
      <div className="h-[400px] border rounded-md overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          onChange={(value) => onChange(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            readOnly: false,
          }}
        />
      </div>

      <Card className="p-4 h-[200px] overflow-auto bg-muted">
        <iframe
          ref={iframeRef}
          title="Code Output"
          sandbox="allow-scripts"
          className="w-full h-full border-none"
        />
      </Card>
    </div>
  );
};

export default CodePlayground;