import {
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";

import LiveTranscript from "./LiveTranscript";
import useVoiceTutorConversation, {
  type VoiceTutorState,
} from "./useVoiceTutorConversation";
import type { TutorContextInput } from "../../services/tutor/TutorContextService";

type VoiceTutorPanelProps = {
  context: TutorContextInput;
};

function VoiceTutorPanel({ context }: VoiceTutorPanelProps) {
  const {
    conversationState,
    sessionStatus,
    messages,
    partialTranscript,
    error,
    handleMainAction,
    endSession,
  } = useVoiceTutorConversation(context);

  const stateLabels: Record<VoiceTutorState, string> = {
    Idle: "Ready to begin",
    Speaking: "🤖 Speaking...",
    WaitingForStudent: "⏸ Waiting for your answer...",
    Listening: "🎙 Listening...",
    Thinking: "🧠 Thinking...",
    SpeakingAgain: "🤖 Speaking...",
  };

  const isRunning = sessionStatus === "running";
  const isPaused = sessionStatus === "paused";

  const actionLabel = isRunning
    ? "Pause Session"
    : isPaused
      ? "Resume Session"
      : "Start Session";

  const statusLabel = isPaused
    ? "⏸ Session paused"
    : sessionStatus === "ended"
      ? "Session ended"
      : stateLabels[conversationState];

  const ActionIcon = isRunning ? PauseIcon : PlayIcon;

  return (
    <aside className="flex min-h-[650px] flex-col rounded-2xl border border-slate-700 bg-slate-900 p-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
          Voice AI Tutor
        </p>
        <h2 className="mt-2 text-xl font-bold text-white">
          Live Transcription
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          A spoken lesson with pauses for student responses.
        </p>

        <div
          role="status"
          className="mt-4 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-center text-sm font-semibold text-blue-300"
        >
          {statusLabel}
        </div>

        {error && (
          <div
            role="alert"
            className="mt-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300"
          >
            {error}
          </div>
        )}
      </div>

      <LiveTranscript
        messages={messages}
        partialTranscript={partialTranscript}
      />

      <div className="mt-5 flex flex-col items-center">
        <div className="relative">
          {isRunning && (
            <span className="absolute inset-0 rounded-full bg-blue-400 opacity-40 animate-ping" />
          )}

          <button
            type="button"
            aria-label={actionLabel}
            aria-pressed={isRunning}
            onClick={handleMainAction}
            className={`relative flex h-14 w-14 items-center justify-center rounded-full text-white transition ${
              isRunning
                ? "bg-blue-400 shadow-[0_0_24px_rgba(96,165,250,0.8)] ring-4 ring-blue-400/30"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            <ActionIcon className="h-7 w-7" />
          </button>
        </div>

        <p className="mt-3 text-sm font-semibold text-slate-300">
          {actionLabel}
        </p>

        {(isRunning || isPaused) && (
          <button
            type="button"
            onClick={endSession}
            className="mt-2 text-xs font-semibold text-slate-500 transition hover:text-slate-300"
          >
            End Session
          </button>
        )}
      </div>
    </aside>
  );
}

export default VoiceTutorPanel;
