import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CodePlayground from "@/components/CodePlayground";
import LessonContent from "@/components/LessonContent";
import { lessons } from "@/lib/lessons";
import { cn } from "@/lib/utils";

const Index = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [code, setCode] = useState(lessons[0].initialCode || "");

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
      setCode(lessons[currentLesson + 1].initialCode || "");
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(prev => prev - 1);
      setCode(lessons[currentLesson - 1].initialCode || "");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">
                {lessons[currentLesson].title}
              </h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={prevLesson}
                  disabled={currentLesson === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={nextLesson}
                  disabled={currentLesson === lessons.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>
            <LessonContent content={lessons[currentLesson].content} />
          </Card>
          
          <Card className="p-6">
            <CodePlayground
              code={code}
              onChange={setCode}
              language={lessons[currentLesson].language}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;