import { marked } from "marked";
import DOMPurify from "dompurify";
import { useState } from "react";
import { QuizQuestion, QuizAnswer } from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";

interface LessonContentProps {
  content: string;
  questions?: QuizQuestion[];
  isQuiz?: boolean;
}

const LessonContent = ({ content, questions = [], isQuiz = false }: LessonContentProps) => {
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const { toast } = useToast();

  const rawHtml = marked.parse(content, { async: false }) as string;
  
  const purifyConfig = {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'p', 'div', 'span', 'a', 'ul', 'ol', 
      'li', 'code', 'pre', 'strong', 'em',
      'blockquote', 'hr', 'input', 'label'
    ],
    ALLOWED_ATTR: ['class', 'id', 'href', 'type', 'value'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'form'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  };

  const sanitizedHtml = DOMPurify.sanitize(rawHtml, purifyConfig);

  const handleAnswerChange = (questionId: number, answer: string | string[]) => {
    console.log('Answer changed:', { questionId, answer });
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, answer } : a);
      }
      return [...prev, { questionId, answer }];
    });
  };

  const checkAnswers = () => {
    console.log('Checking answers:', answers);
    let correct = 0;
    let feedback = [];

    questions.forEach(question => {
      const userAnswer = answers.find(a => a.questionId === question.id);
      if (!userAnswer) {
        feedback.push(`Question ${question.id}: No answer provided`);
        return;
      }

      let isCorrect = false;
      if (Array.isArray(question.correctAnswer)) {
        isCorrect = Array.isArray(userAnswer.answer) &&
          question.correctAnswer.every((ans, idx) => 
            String(ans).toLowerCase() === String(userAnswer.answer[idx]).toLowerCase()
          );
      } else {
        isCorrect = String(userAnswer.answer).toLowerCase() === String(question.correctAnswer).toLowerCase();
      }

      if (isCorrect) {
        correct++;
        feedback.push(`Question ${question.id}: Correct!`);
      } else {
        feedback.push(`Question ${question.id}: Incorrect`);
      }
    });

    console.log('Quiz results:', { correct, total: questions.length, feedback });

    toast({
      title: `Quiz Results: ${correct}/${questions.length}`,
      description: feedback.join('\n'),
      duration: 5000,
    });
  };

  const renderQuestion = (question: QuizQuestion) => {
    const currentAnswer = answers.find(a => a.questionId === question.id)?.answer;

    switch (question.type) {
      case 'fillInBlank':
        return (
          <div key={question.id} className="mb-6 space-y-2">
            <Label className="text-lg font-medium">{question.question}</Label>
            <Input
              type="text"
              className="max-w-md"
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              value={currentAnswer as string || ''}
              placeholder="Type your answer here"
            />
          </div>
        );

      case 'multipleChoice':
        return (
          <div key={question.id} className="mb-6 space-y-2">
            <Label className="text-lg font-medium">{question.question}</Label>
            <RadioGroup
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              value={currentAnswer as string}
              className="space-y-2"
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`q${question.id}-${index}`} />
                  <Label htmlFor={`q${question.id}-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'trueFalse':
        return (
          <div key={question.id} className="mb-6 space-y-2">
            <Label className="text-lg font-medium">{question.question}</Label>
            <RadioGroup
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              value={currentAnswer as string}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id={`q${question.id}-true`} />
                <Label htmlFor={`q${question.id}-true`}>True</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id={`q${question.id}-false`} />
                <Label htmlFor={`q${question.id}-false`}>False</Label>
              </div>
            </RadioGroup>
          </div>
        );

      case 'matching':
        return (
          <div key={question.id} className="mb-6 space-y-2">
            <Label className="text-lg font-medium">{question.question}</Label>
            {question.matchingPairs?.map((pair, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 items-center max-w-md">
                <div className="font-medium">{pair.left}</div>
                <Input
                  type="text"
                  onChange={(e) => {
                    const newAnswers = [...(currentAnswer as string[] || [])];
                    newAnswers[index] = e.target.value;
                    handleAnswerChange(question.id, newAnswers);
                  }}
                  value={(currentAnswer as string[] || [])[index] || ''}
                  placeholder="Type matching answer"
                />
              </div>
            ))}
          </div>
        );

      case 'codeCorrection':
        return (
          <div key={question.id} className="mb-6 space-y-2">
            <Label className="text-lg font-medium">{question.question}</Label>
            <Input
              className="font-mono max-w-md"
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              value={currentAnswer as string || ''}
              placeholder="Type corrected code here"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className="prose prose-slate dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
      {isQuiz && questions && questions.length > 0 && (
        <div className="mt-8 space-y-6 p-6 border rounded-lg bg-card">
          <h2 className="text-2xl font-bold mb-6">Quiz Questions</h2>
          {questions.map(renderQuestion)}
          <Button 
            onClick={checkAnswers} 
            className="mt-6"
            size="lg"
          >
            Submit Answers
          </Button>
        </div>
      )}
    </div>
  );
};

export default LessonContent;