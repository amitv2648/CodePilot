import { useEffect, useRef } from "react";
import type { TranscriptMessage } from "./useVoiceTutorConversation";

type LiveTranscriptProps = {
  messages: TranscriptMessage[];
  partialTranscript?: string;
};

function LiveTranscript({
  messages,
  partialTranscript = "",
}: LiveTranscriptProps) {
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, partialTranscript]);

  return (
    <div
      aria-label="Live AI tutor transcript"
      aria-live="polite"
      className="mt-5 flex-1 overflow-y-auto rounded-xl border border-slate-700 bg-slate-950 p-5 text-slate-300 leading-7"
    >
      {messages.length === 0 && !partialTranscript ? (
        <p className="text-sm text-slate-500">
          Start the Voice Tutor to follow along with live subtitles.
        </p>
      ) : (
        <div className="space-y-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.speaker === "Student"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] rounded-xl border p-3 ${
                  message.speaker === "Student"
                    ? "border-slate-600 bg-slate-800 text-right"
                    : "border-blue-500/40 bg-blue-600/10 text-left"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    message.speaker === "Student"
                      ? "text-slate-400"
                      : "text-blue-400"
                  }`}
                >
                  {message.speaker}
                </p>
                <p className="mt-1">{message.text}</p>
              </div>
            </div>
          ))}

          {partialTranscript && (
            <div className="flex justify-end">
              <div className="max-w-[90%] rounded-xl border border-slate-600 bg-slate-800/70 p-3 text-right text-slate-300">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Student · Live
                </p>
                <p className="mt-1">{partialTranscript}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div ref={transcriptEndRef} />
    </div>
  );
}

export default LiveTranscript;
