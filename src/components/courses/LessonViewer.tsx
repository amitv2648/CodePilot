import type { Lesson } from "../../data/courses";

type LessonViewerProps = {
  lesson: Lesson;
};

function LessonViewer({ lesson }: LessonViewerProps) {
  return (
    <div className="h-full rounded-2xl border border-slate-700 bg-slate-900 p-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
        Lesson {lesson.id}
      </p>

      <h1 className="mt-3 text-4xl font-bold text-white">
        {lesson.title}
      </h1>

      <p className="mt-6 max-w-3xl text-slate-300 leading-8">
        {lesson.description}
      </p>

      <div className="mt-6 max-w-3xl space-y-4 text-slate-300 leading-8">
        {lesson.explanation.split("\n\n").map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-slate-700 bg-slate-950 p-5">
        <p className="mb-3 text-sm text-slate-400">
          Example
        </p>

        <pre className="overflow-x-auto text-green-400">
          <code>{lesson.code}</code>
        </pre>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-700 bg-slate-950 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Challenge
          </p>
          <p className="text-slate-300 leading-7">
            {lesson.challenge}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-950 p-5">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Hint
          </p>
          <p className="text-slate-300 leading-7">
            {lesson.hint}
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          Start Lesson →
        </button>

        <button
          className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-300 transition hover:bg-slate-800"
        >
          Mark Complete
        </button>
      </div>
    </div>
  );
}

export default LessonViewer;