# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/85e505b4-6f2b-4dff-9e20-7ebe5c48aacb

## Adding New Lessons

To add new lessons to the application:

1. Navigate to `src/lib/lessons/[category]` directory
2. Create a new file for your lesson (e.g., `my-new-lesson.ts`)
3. Follow this template:
```typescript
import { Lesson } from "../../types";

export const myNewLesson: Lesson = {
  id: [unique_number],
  title: "Your Lesson Title",
  content: `
    # Your Lesson Content
    Write your lesson content using Markdown
  `,
  language: "html", // or css, javascript, etc.
  initialCode: `<!-- Initial code for the playground -->`
};
```
4. Import and add your lesson to the appropriate category in `src/lib/lessons/index.ts`

## Adding New Categories

To add a new category tab:

1. Update `src/lib/lessons/index.ts`:
```typescript
export const lessonCategories: LessonCategory[] = [
  {
    title: "Your New Category",
    lessons: [
      // Import and add your lessons here
    ],
  },
  {
    title: "HTML",
    lessons: [
      htmlIntroduction,
      htmlElements,
      htmlAttributes,
      htmlForms,
    ],
  },
  {
    title: "CSS",
    lessons: [
      cssIntroduction,
      cssSelectors,
      cssBoxModel,
      cssLayout,
    ],
  },
];
```
```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```     
# Here are step-by-step instructions to build the project locally and push the changes to the `gh-pages` branch using VS Code:

### Step 1: Open Your Project in VS Code

1. Open VS Code.
2. Open your project folder (`safe-code-academy`) in VS Code.

### Step 2: Build Your Project Locally

1. Open a terminal in VS Code (`Ctrl + ` `).
2. Run the build command:
   ```sh
   npm install
   npm run build
   ```
   Ensure the build output is in a directory like `dist` or `build`.

### Step 3: Create and Switch to gh-pages Branch

1. In the terminal, run the following commands to create and switch to the `gh-pages` branch:
   ```sh
   git checkout -b gh-pages
   ```

### Step 4: Add and Commit Build Files

1. Add the build output directory:
   ```sh
   git add dist  # Replace 'dist' with your build output directory
   ```
2. Commit the changes:
   ```sh
   git commit -m "Deploy to GitHub Pages"
   ```

### Step 5: Push to gh-pages Branch

1. Push the changes to the `gh-pages` branch:
   ```sh
   git push origin gh-pages
   ```

### Step 6: Configure GitHub Pages

1. Go to [GitHub Pages settings](https://github.com/xander-haj/safe-code-academy/settings/pages) in your repository.
2. Set the source to the `gh-pages` branch and save.

By following these steps, your project will be built locally and deployed to GitHub Pages.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/85e505b4-6f2b-4dff-9e20-7ebe5c48aacb) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
