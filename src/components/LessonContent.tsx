import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LessonContentProps {
  content: string;
}

const LessonContent = ({ content }: LessonContentProps) => {
  const { toast } = useToast();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleQuizSubmit = (questionIndex: number, answer: string, correctAnswer: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
    
    if (showResults) {
      const isCorrect = answer.toLowerCase() === correctAnswer.toLowerCase();
      toast({
        title: isCorrect ? "Correct!" : "Incorrect",
        description: isCorrect ? "Great job!" : `The correct answer was: ${correctAnswer}`,
        variant: isCorrect ? "default" : "destructive",
      });
    }
  };

  const processQuizContent = (content: string) => {
    let processedContent = content;
    const quizAnswers: Array<{ type: string; correct: string }> = [];
    
    // Extract quiz answers and remove them from content
    processedContent = processedContent.replace(
      /<quiz-answer type="([^"]+)" correct="([^"]+)" \/>/g,
      (_, type, correct) => {
        quizAnswers.push({ type, correct });
        return "";
      }
    );

    // Add interactive elements based on quiz type
    quizAnswers.forEach((answer, index) => {
      const placeholder = `[QUIZ-${index}]`;
      let interactiveElement = "";

      switch (answer.type) {
        case "fill-blank":
          interactiveElement = `
            <div class="my-4">
              <input type="text" class="border p-2 rounded" 
                     onchange="window.handleQuizAnswer(${index}, this.value, '${answer.correct}')" />
              <button onclick="window.checkAnswer(${index})" class="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                Check
              </button>
            </div>
          `;
          break;
        case "multiple-choice":
        case "true-false":
          const options = answer.type === "multiple-choice" 
            ? ["<ol>", "<li>", "<ul>", "<list>"]
            : ["True", "False"];
          interactiveElement = `
            <div class="my-4">
              ${options.map((opt, i) => `
                <label class="block mb-2">
                  <input type="radio" name="q${index}" value="${i}"
                         onchange="window.handleQuizAnswer(${index}, '${i}', '${answer.correct}')" />
                  ${opt}
                </label>
              `).join("")}
            </div>
          `;
          break;
        case "matching":
          interactiveElement = `
            <div class="my-4">
              ${answer.correct.split(',').map((pair, i) => {
                const [question, answer] = pair.split('-');
                return `
                  <label class="block mb-2">
                    ${question} <input type="text" onchange="window.handleQuizAnswer(${index}, this.value, '${answer}')" />
                  </label>
                `;
              }).join("")}
            </div>
          `;
          break;
        case "code":
          interactiveElement = `
            <div class="my-4">
              <textarea class="border p-2 rounded" onchange="window.handleQuizAnswer(${index}, this.value, '${answer.correct}')"></textarea>
              <button onclick="window.checkAnswer(${index})" class="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                Check
              </button>
            </div>
          `;
          break;
      }

      processedContent = processedContent.replace(/\n\n/g, `\n\n${placeholder}\n\n`);
      processedContent = processedContent.replace(placeholder, interactiveElement);
    });

    return processedContent;
  };

  useEffect(() => {
    // Add global handlers for quiz interactions
    window.handleQuizAnswer = (index: number, answer: string, correct: string) => {
      handleQuizSubmit(index, answer, correct);
    };

    window.checkAnswer = (index: number) => {
      setShowResults(true);
    };

    return () => {
      // Cleanup
      delete window.handleQuizAnswer;
      delete window.checkAnswer;
    };
  }, []);

  const sanitizedContent = DOMPurify.sanitize(marked(processQuizContent(content)), {
    ADD_TAGS: ["input", "button", "label"],
    ADD_ATTR: ["type", "onchange", "onclick", "name", "value", "class"],
  });

  return (
    <div 
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default LessonContent;
