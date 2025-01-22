import { Lesson } from "../../types";

export const cssSelectors: Lesson = {
  id: 6,
  title: "CSS Selectors",
  content: `
# CSS Selectors

Learn how to select HTML elements to apply styles.

## Challenge

Use different types of selectors:
- Element selector
- Class selector
- ID selector
  `,
  language: "html",
  initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Selectors</title>
    <style>
        /* Add your selectors and styles */
        
    </style>
</head>
<body>
    <h1>Main Title</h1>
    <p class="highlight">Highlighted text</p>
    <div id="special">Special content</div>
</body>
</html>`,
};