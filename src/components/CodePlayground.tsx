import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CodePlaygroundProps {
  code: string;
  onChange: (value: string) => void;
  language: string;
}

const CodePlayground = ({ code, onChange, language }: CodePlaygroundProps) => {
  const [output, setOutput] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runCode = () => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const sanitizedCode = DOMPurify.sanitize(code);

    // Create a safe environment for HTML/CSS/JS execution
    const safeHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            /* Reset default styles */
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { padding: 1rem; }
          </style>
        </head>
        <body>
          ${sanitizedCode}
          <script>
            // Prevent access to sensitive APIs
            delete window.localStorage;
            delete window.sessionStorage;
            delete window.indexedDB;
            delete window.openDatabase;
            window.fetch = null;
            window.XMLHttpRequest = null;
          </script>
        </body>
      </html>
    `;

    // Update iframe content
    iframe.srcdoc = safeHtml;
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