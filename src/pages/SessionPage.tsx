import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

import CodeEditor from "../components/courses/CodeEditor";
import VoiceTutorPanel from "../components/courses/VoiceTutorPanel";
import { courses } from "../data/courses";
import PythonExecutionService from "../services/execution/PythonExecutionService";

const pythonExecutionService = new PythonExecutionService();

function SessionPage() {
  const { language, lessonId } = useParams();
  const [editorResetKey, setEditorResetKey] = useState(0);
  const [output, setOutput] = useState(
    "Run your code to see the output here.",
  );
  const [isExecuting, setIsExecuting] = useState(false);
  const [studentCodeState, setStudentCodeState] = useState<{
    lessonId: number;
    code: string;
  } | null>(null);

  const course = language
    ? courses[decodeURIComponent(language)]
    : undefined;
  const lesson = course?.lessons.find(
    (candidate) => candidate.id === Number(lessonId),
  );

  if (!course || !lesson) {
    return (
      <div className="p-10 text-white">
        Session not found.
      </div>
    );
  }

  const courseLanguage = course.language;
  const completedLessons = course.lessons.filter(
    (courseLesson) => courseLesson.completed,
  ).length;
  const studentCode =
    studentCodeState?.lessonId === lesson.id
      ? studentCodeState.code
      : lesson.code;
  const studentProgress =
    course.lessons.length === 0
      ? 0
      : Math.round(
          (completedLessons / course.lessons.length) * 100,
        );

  async function handleRunCode() {
    if (courseLanguage !== "Python") {
      setOutput("Code execution currently supports Python only.");
      return;
    }

    setIsExecuting(true);
    setOutput("Loading Python and running your code...");

    try {
      const result =
        await pythonExecutionService.execute(studentCode);
      setOutput(result.output);

      if (!result.succeeded) {
        toast.error("Python returned an error.");
      }
    } catch (executionError) {
      const message =
        executionError instanceof Error
          ? executionError.message
          : "Python execution failed.";
      setOutput(message);
      toast.error(message);
    } finally {
      setIsExecuting(false);
    }
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#f8fafc",
            border: "1px solid #334155",
          },
        }}
      />

      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            {course.language} · Lesson {lesson.id}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            {lesson.title} Session
          </h1>
        </div>

        <div className="grid min-h-[650px] gap-4 xl:grid-cols-[1fr_2fr_1fr]">
          <VoiceTutorPanel
            context={{
              language: course.language,
              lessonTitle: lesson.title,
              lessonDescription: lesson.description,
              lessonExplanation: lesson.explanation,
              lessonChallenge: lesson.challenge,
              lessonHint: lesson.hint,
              currentLessonNumber: lesson.id,
              totalLessons: course.lessons.length,
              completedLessons,
              studentProgress,
              studentCode,
            }}
          />

          <section
            aria-live="polite"
            className="min-h-[650px] rounded-2xl border border-slate-700 bg-slate-900 p-8 text-white"
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-700 pb-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                  AI Whiteboard
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  Current Topic
                </h2>
              </div>

              <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs font-semibold text-blue-300">
                Lesson {lesson.id}
              </span>
            </div>

            <div className="mt-8">
              <h3 className="text-3xl font-bold text-white">
                {lesson.title}
              </h3>
              <p className="mt-3 text-lg text-slate-300">
                {lesson.description}
              </p>

              <div className="mt-8 space-y-5 text-slate-300 leading-8">
                {lesson.explanation.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-8 rounded-xl border-l-4 border-blue-500 bg-slate-950 p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                  Remember
                </p>
                <p className="mt-2 text-slate-300">
                  {lesson.hint}
                </p>
              </div>
            </div>
          </section>

          <section className="flex min-h-[650px] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
            <div className="p-4">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                    Coding Exercise
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    {lesson.challenge}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditorResetKey(
                      (currentKey) => currentKey + 1,
                    );
                    setStudentCodeState({
                      lessonId: lesson.id,
                      code: lesson.code,
                    });
                  }}
                  className="shrink-0 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-800"
                >
                  Reset
                </button>
              </div>

                <CodeEditor
                  key={editorResetKey}
                  language={course.language}
                  initialCode={lesson.code}
                  height="260px"
                  onCodeChange={(code) =>
                    setStudentCodeState({
                      lessonId: lesson.id,
                      code,
                    })
                  }
                />
            </div>

            <div className="flex justify-center border-y border-slate-700 bg-slate-800 p-3">
              <button
                type="button"
                onClick={handleRunCode}
                disabled={isExecuting}
                className="rounded-xl bg-blue-600 px-8 py-2.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-wait disabled:bg-blue-800"
              >
                {isExecuting ? "Running..." : "Run Code"}
              </button>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
                Output
              </p>

              <pre className="mt-3 min-h-[180px] flex-1 overflow-auto whitespace-pre-wrap rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-300">
                {output}
              </pre>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default SessionPage;
