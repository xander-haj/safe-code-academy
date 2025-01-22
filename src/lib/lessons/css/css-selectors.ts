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

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>CSS Selectors</title>
    <style>
        /* Element selector */
        h1 {
            color: purple;
        }
        
        /* Class selector */
        .highlight {
            background-color: yellow;
            padding: 10px;
        }
        
        /* ID selector */
        #special {
            border: 2px solid green;
            margin: 20px;
            padding: 10px;
        }
    </style>
</head>
<body>
    <h1>Main Title</h1>
    <p class="highlight">This paragraph has a yellow background.</p>
    <div id="special">This div has a green border.</div>
</body>
</html>
\`\`\`

Try adding more selectors or modifying the existing styles!
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
</html>`
};