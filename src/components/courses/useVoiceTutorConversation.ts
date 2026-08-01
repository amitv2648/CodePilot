import { useEffect, useRef, useState } from "react";

import SpeechRecognitionService from "../../services/voice/SpeechRecognitionService";
import PlaceholderAiTutorEngine, {
  type AiTutorEngine,
} from "../../services/tutor/AiTutorEngine";
import ConversationManager from "../../services/tutor/ConversationManager";
import TutorContextService, {
  type TutorContextInput,
} from "../../services/tutor/TutorContextService";

export type VoiceTutorState =
  | "Idle"
  | "Speaking"
  | "WaitingForStudent"
  | "Listening"
  | "Thinking"
  | "SpeakingAgain";

export type VoiceSessionStatus =
  | "idle"
  | "running"
  | "paused"
  | "ended";

export type TranscriptMessage = {
  id: number;
  speaker: "AI Tutor" | "Student";
  text: string;
};

export interface VoiceConversationServices {
  speak: (text: string) => Promise<void>;
  stopSpeaking: () => void;
  captureStudentResponse?: () => Promise<string>;
  generateTutorResponse?: (studentText: string) => Promise<string>;
}

let finishCurrentSpeech: (() => void) | null = null;

function getPreferredTutorVoice() {
  const britishVoices = window.speechSynthesis
    .getVoices()
    .filter((voice) =>
      voice.lang.toLowerCase().startsWith("en-gb"),
    );
  const preferredMaleVoice = britishVoices.find((voice) =>
    /ryan|george|daniel|arthur|oliver|male/i.test(voice.name),
  );

  return preferredMaleVoice ?? britishVoices[0];
}

const browserVoiceServices: VoiceConversationServices = {
  speak(text) {
    if (
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    ) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const finish = () => {
        finishCurrentSpeech = null;
        resolve();
      };
      const spokenMessage = new SpeechSynthesisUtterance(text);
      const tutorVoice = getPreferredTutorVoice();

      finishCurrentSpeech = finish;
      spokenMessage.lang = "en-GB";
      spokenMessage.rate = 0.92;
      spokenMessage.pitch = 0.9;
      spokenMessage.voice = tutorVoice ?? null;
      spokenMessage.onend = finish;
      spokenMessage.onerror = finish;
      window.speechSynthesis.speak(spokenMessage);
    });
  },
  stopSpeaking() {
    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
    }

    finishCurrentSpeech?.();
  },
};

const defaultAiTutorEngine = new PlaceholderAiTutorEngine();

function useVoiceTutorConversation(
  tutorContext: TutorContextInput,
  services: VoiceConversationServices = browserVoiceServices,
  aiTutorEngine: AiTutorEngine = defaultAiTutorEngine,
) {
  const [recognitionService] = useState(
    () => new SpeechRecognitionService(),
  );
  const [conversationManager] = useState(
    () => new ConversationManager(10),
  );
  const [tutorContextService] = useState(
    () => new TutorContextService(tutorContext),
  );
  const [sessionStatus, setSessionStatus] =
    useState<VoiceSessionStatus>("idle");
  const [conversationState, setConversationState] =
    useState<VoiceTutorState>("Idle");
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const [partialTranscript, setPartialTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  const sessionStatusRef = useRef<VoiceSessionStatus>("idle");
  const conversationRunRef = useRef(0);
  const nextMessageIdRef = useRef(0);
  const processingStudentResponseRef = useRef(false);

  useEffect(() => {
    tutorContextService.updateEducationalContext(tutorContext);
  }, [tutorContext, tutorContextService]);

  useEffect(
    () => () => {
      sessionStatusRef.current = "ended";
      recognitionService.stopListening();
      services.stopSpeaking();
    },
    [recognitionService, services],
  );

  function updateSessionStatus(status: VoiceSessionStatus) {
    sessionStatusRef.current = status;
    setSessionStatus(status);
  }

  function appendMessage(
    speaker: TranscriptMessage["speaker"],
    text: string,
  ) {
    const message: TranscriptMessage = {
      id: nextMessageIdRef.current,
      speaker,
      text,
    };

    nextMessageIdRef.current += 1;
    conversationManager.addMessage({
      speaker,
      text,
    });
    tutorContextService.updateRecentConversation(
      conversationManager.getRecentMessages(),
    );
    setMessages((currentMessages) => [
      ...currentMessages,
      message,
    ]);
  }

  async function speakTutorMessage(
    text: string,
    state: "Speaking" | "SpeakingAgain",
    listenAfter: boolean,
    conversationRun: number,
  ) {
    if (
      sessionStatusRef.current !== "running" ||
      conversationRunRef.current !== conversationRun
    ) {
      return;
    }

    setConversationState(state);
    appendMessage("AI Tutor", text);
    await services.speak(text);

    if (
      sessionStatusRef.current !== "running" ||
      conversationRunRef.current !== conversationRun
    ) {
      return;
    }

    if (listenAfter) {
      setConversationState("WaitingForStudent");
      window.setTimeout(() => {
        if (
          sessionStatusRef.current === "running" &&
          conversationRunRef.current === conversationRun
        ) {
          beginListening(conversationRun);
        }
      }, 700);
    }
  }

  function processStudentResponse(
    transcript: string,
    conversationRun: number,
  ) {
    const finalTranscript = transcript.trim();

    if (
      !finalTranscript ||
      processingStudentResponseRef.current ||
      sessionStatusRef.current !== "running"
    ) {
      return;
    }

    processingStudentResponseRef.current = true;
    recognitionService.stopListening();
    setPartialTranscript("");
    appendMessage("Student", finalTranscript);
    setConversationState("Thinking");

    window.setTimeout(() => {
      if (
        sessionStatusRef.current !== "running" ||
        conversationRunRef.current !== conversationRun
      ) {
        return;
      }

      void aiTutorEngine
        .generateResponse(
          tutorContextService.getContext(),
          finalTranscript,
        )
        .then((reply) => {
          if (
            sessionStatusRef.current !== "running" ||
            conversationRunRef.current !== conversationRun
          ) {
            return;
          }

          processingStudentResponseRef.current = false;
          void speakTutorMessage(
            reply,
            "SpeakingAgain",
            true,
            conversationRun,
          );
        });
    }, 1500);
  }

  function beginListening(conversationRun: number) {
    if (
      sessionStatusRef.current !== "running" ||
      conversationRunRef.current !== conversationRun
    ) {
      return;
    }

    processingStudentResponseRef.current = false;
    setError(null);
    setPartialTranscript("");
    setConversationState("Listening");

    recognitionService.onTranscript(setPartialTranscript);
    recognitionService.onFinalTranscript((transcript) => {
      processStudentResponse(transcript, conversationRun);
    });
    recognitionService.onError((message) => {
      setError(message);
    });
    recognitionService.onEnd(() => {
      if (
        sessionStatusRef.current !== "running" ||
        conversationRunRef.current !== conversationRun ||
        processingStudentResponseRef.current
      ) {
        return;
      }

      setConversationState("WaitingForStudent");
      window.setTimeout(() => {
        if (
          sessionStatusRef.current === "running" &&
          conversationRunRef.current === conversationRun &&
          !processingStudentResponseRef.current
        ) {
          beginListening(conversationRun);
        }
      }, 700);
    });

    try {
      recognitionService.startListening();
    } catch (recognitionError) {
      const message =
        recognitionError instanceof Error
          ? recognitionError.message
          : "Voice recognition could not start.";
      setError(message);
      setConversationState("WaitingForStudent");
    }
  }

  async function runLessonOpening(conversationRun: number) {
    const context = tutorContextService.getContext();

    await speakTutorMessage(
      "Welcome back!",
      "Speaking",
      false,
      conversationRun,
    );
    await speakTutorMessage(
      `Today we'll learn ${context.lessonTitle.toLowerCase()} in ${context.language}.`,
      "Speaking",
      false,
      conversationRun,
    );
    await speakTutorMessage(
      "What do you think this concept helps a programmer do?",
      "Speaking",
      true,
      conversationRun,
    );
  }

  async function startSession() {
    setError(null);

    if (!recognitionService.isSupported()) {
      setError(
        "Voice recognition is not supported in this browser.",
      );
      return;
    }

    try {
      await recognitionService.requestPermission();
    } catch (permissionError) {
      const message =
        permissionError instanceof DOMException &&
        permissionError.name === "NotAllowedError"
          ? "Microphone permission was denied."
          : permissionError instanceof Error
            ? permissionError.message
            : "Microphone access could not be started.";
      setError(message);
      return;
    }

    conversationRunRef.current += 1;
    const conversationRun = conversationRunRef.current;

    services.stopSpeaking();
    recognitionService.stopListening();
    nextMessageIdRef.current = 0;
    processingStudentResponseRef.current = false;
    conversationManager.clear();
    tutorContextService.updateRecentConversation([]);
    setMessages([]);
    setPartialTranscript("");
    updateSessionStatus("running");
    void runLessonOpening(conversationRun);
  }

  function pauseSession() {
    conversationRunRef.current += 1;
    processingStudentResponseRef.current = false;
    recognitionService.stopListening();
    services.stopSpeaking();
    setPartialTranscript("");
    updateSessionStatus("paused");
  }

  function resumeSession() {
    conversationRunRef.current += 1;
    const conversationRun = conversationRunRef.current;

    setError(null);
    updateSessionStatus("running");
    void speakTutorMessage(
      "Let's continue. Tell me what you're thinking.",
      "SpeakingAgain",
      true,
      conversationRun,
    );
  }

  function endSession() {
    conversationRunRef.current += 1;
    processingStudentResponseRef.current = false;
    recognitionService.stopListening();
    services.stopSpeaking();
    setPartialTranscript("");
    setConversationState("Idle");
    updateSessionStatus("ended");
  }

  function handleMainAction() {
    if (sessionStatus === "running") {
      pauseSession();
      return;
    }

    if (sessionStatus === "paused") {
      resumeSession();
      return;
    }

    void startSession();
  }

  return {
    conversationState,
    sessionStatus,
    messages,
    partialTranscript,
    error,
    handleMainAction,
    endSession,
  };
}

export default useVoiceTutorConversation;
