import { Lesson } from "../../types";

export const cssBoxModel: Lesson = {
  id: 7,
  title: "CSS Box Model",
  content: `
# CSS Box Model

Learn about margin, padding, border, and content areas.

## Challenge

Create a box with:
- Padding on all sides
- A border
- Margin spacing

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>CSS Box Model</title>
    <style>
        .box {
            /* Content */
            width: 200px;
            height: 100px;
            
            /* Padding */
            padding: 20px;
            
            /* Border */
            border: 2px solid blue;
            
            /* Margin */
            margin: 30px;
            
            /* Additional styles for visibility */
            background-color: lightblue;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="box">This is a box with padding, border, and margin!</div>
</body>
</html>
\`\`\`

Try adjusting the padding, border, and margin values to see how they affect the box!
  `,
  language: "html",
  initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Box Model</title>
    <style>
        /* Style your box here */
        
    </style>
</head>
<body>
    <div class="box">Box Model Example</div>
</body>
</html>`
};