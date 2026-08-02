export type SessionRecord = {
  id: string;
  language: string;
  lessonId: number;
  lessonTitle: string;
  startedAt: string;
};

const STORAGE_KEY = "codepilot-session-history";
const MAX_SESSIONS = 50;

function readSessions(): SessionRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as SessionRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSessions(sessions: SessionRecord[]) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(sessions.slice(0, MAX_SESSIONS)),
  );
}

export function getSessionHistory() {
  return readSessions().sort(
    (a, b) =>
      new Date(b.startedAt).getTime() -
      new Date(a.startedAt).getTime(),
  );
}

export function recordSession(
  language: string,
  lessonId: number,
  lessonTitle: string,
) {
  const sessions = readSessions();
  const record: SessionRecord = {
    id: `${Date.now()}-${lessonId}`,
    language,
    lessonId,
    lessonTitle,
    startedAt: new Date().toISOString(),
  };

  writeSessions([record, ...sessions]);
}
