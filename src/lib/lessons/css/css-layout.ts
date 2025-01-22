import { Lesson } from "../../types";

export const cssLayout: Lesson = {
  id: 8,
  title: "CSS Layout",
  content: `
# CSS Layout

Learn about different layout techniques using CSS.

## Challenge

Create a simple layout with:
- A header
- Two columns
- A footer

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>CSS Layout</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        header {
            background-color: #333;
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .container {
            display: flex;
            margin: 20px;
        }
        
        .column {
            flex: 1;
            padding: 20px;
        }
        
        .column:first-child {
            background-color: #f0f0f0;
        }
        
        .column:last-child {
            background-color: #e0e0e0;
        }
        
        footer {
            background-color: #333;
            color: white;
            padding: 20px;
            text-align: center;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>
<body>
    <header>
        <h1>My Website</h1>
    </header>
    
    <div class="container">
        <div class="column">
            <h2>Left Column</h2>
            <p>This is the content for the left column.</p>
        </div>
        <div class="column">
            <h2>Right Column</h2>
            <p>This is the content for the right column.</p>
        </div>
    </div>
    
    <footer>
        <p>Footer Content</p>
    </footer>
</body>
</html>
\`\`\`

Try modifying the layout or adding more sections to the page!
  `,
  language: "html",
  initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>CSS Layout</title>
    <style>
        /* Add your layout styles */
        
    </style>
</head>
<body>
    <!-- Create your layout structure -->
    
</body>
</html>`
};