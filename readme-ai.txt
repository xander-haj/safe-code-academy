# AI Instructions for Safe Code Academy Project

## Project Overview
This is a web-based coding education platform built with React, TypeScript, and Vite. The application provides interactive coding lessons with a split-view interface showing lesson content and a code playground.

## Core Components

1. Index.tsx (Main Page)
- Manages lesson state and navigation
- Displays lesson content and code playground side by side
- Handles lesson progression

2. LessonContent.tsx
- Renders markdown lesson content
- Implements strict HTML sanitization using DOMPurify
- Supports various markdown elements with security restrictions

3. CodePlayground.tsx
- Provides interactive code editing environment
- Implements secure code execution in sandboxed iframe
- Uses Monaco editor for code editing

## Data Structure

Lessons are stored in src/lib/lessons.ts with the following structure:
```typescript
interface Lesson {
  id: number;
  title: string;
  content: string;
  language: string;
  initialCode: string;
}
```

## Security Implementation

1. Content Sanitization
- All user input and markdown content is sanitized using DOMPurify
- Strict configuration prevents XSS attacks
- Allowed HTML tags and attributes are explicitly defined

2. Code Execution Safety
- Code playground runs in sandboxed iframe
- Content Security Policy (CSP) headers implemented
- User code execution is isolated from main application

## Guidelines for AI Code Updates

1. Security First
- Always maintain DOMPurify sanitization
- Never disable sandbox features
- Keep strict CSP headers

2. Component Structure
- Keep components small and focused
- Maintain separation of concerns
- Use TypeScript interfaces for prop definitions

3. State Management
- Use React hooks for state management
- Implement proper state updates
- Maintain lesson progression logic

4. UI/UX Considerations
- Maintain responsive design
- Use Tailwind CSS for styling
- Implement shadcn/ui components when possible

5. Error Handling
- Implement proper error boundaries
- Log errors for debugging
- Provide user-friendly error messages

6. Code Style
- Follow existing TypeScript configurations
- Maintain consistent formatting
- Use meaningful variable and function names

## Adding New Features

1. New Lessons
- Add to lessons array in src/lib/lessons.ts
- Follow existing lesson structure
- Include proper markdown formatting

2. New Components
- Create in src/components directory
- Use TypeScript interfaces
- Implement proper security measures

3. UI Updates
- Use existing Tailwind classes
- Maintain responsive design
- Follow shadcn/ui patterns

## Testing Changes

1. Security
- Verify DOMPurify configuration
- Test code playground isolation
- Check content sanitization

2. Functionality
- Test lesson navigation
- Verify code execution
- Check state management

3. UI/UX
- Test responsive design
- Verify accessibility
- Check cross-browser compatibility

Remember: Always prioritize security and maintain existing safety measures when making any code changes.