import { Lesson } from "../../types";

export const htmlForms: Lesson = {
  id: 4,
  title: "HTML Forms",
  content: `
# HTML Forms

Learn how to create forms to collect user input.

## Challenge

Create a simple contact form with:
- Name input (text)
- Email input (email)
- Message textarea
- Submit button

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>HTML Forms</title>
</head>
<body>
    <form>
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div>
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit">Send Message</button>
    </form>
</body>
</html>
\`\`\`

Try adding more form elements or modifying the existing ones!
  `,
  language: "html",
  initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>HTML Forms</title>
</head>
<body>
    <!-- Create your form here -->
    
</body>
</html>`
};