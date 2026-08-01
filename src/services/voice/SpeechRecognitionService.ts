type RecognitionAlternative = {
  transcript: string;
};

type RecognitionResult = {
  isFinal: boolean;
  length: number;
  [index: number]: RecognitionAlternative;
};

type RecognitionResultList = {
  length: number;
  [index: number]: RecognitionResult;
};

type RecognitionEvent = {
  resultIndex: number;
  results: RecognitionResultList;
};

type RecognitionErrorEvent = {
  error: string;
};

type BrowserSpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: RecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

type TranscriptHandler = (transcript: string) => void;
type ErrorHandler = (message: string) => void;
type EndHandler = () => void;

class SpeechRecognitionService {
  private recognition: BrowserSpeechRecognition | null = null;
  private transcriptHandler: TranscriptHandler = () => undefined;
  private finalTranscriptHandler: TranscriptHandler = () => undefined;
  private errorHandler: ErrorHandler = () => undefined;
  private endHandler: EndHandler = () => undefined;
  private latestTranscript = "";
  private finalTranscriptDelivered = false;

  isSupported() {
    if (typeof window === "undefined") {
      return false;
    }

    const recognitionWindow = window as SpeechRecognitionWindow;
    return Boolean(
      recognitionWindow.SpeechRecognition ||
        recognitionWindow.webkitSpeechRecognition,
    );
  }

  async requestPermission() {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error(
        "Microphone access is not supported in this browser.",
      );
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    stream.getTracks().forEach((track) => track.stop());
  }

  onTranscript(handler: TranscriptHandler) {
    this.transcriptHandler = handler;
  }

  onFinalTranscript(handler: TranscriptHandler) {
    this.finalTranscriptHandler = handler;
  }

  onError(handler: ErrorHandler) {
    this.errorHandler = handler;
  }

  onEnd(handler: EndHandler) {
    this.endHandler = handler;
  }

  startListening() {
    if (!this.isSupported()) {
      throw new Error(
        "Voice recognition is not supported in this browser.",
      );
    }

    const recognitionWindow = window as SpeechRecognitionWindow;
    const Recognition =
      recognitionWindow.SpeechRecognition ??
      recognitionWindow.webkitSpeechRecognition;

    if (!Recognition) {
      return;
    }

    this.latestTranscript = "";
    this.finalTranscriptDelivered = false;
    this.recognition = new Recognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";

    this.recognition.onresult = (event) => {
      let transcript = "";
      let hasFinalResult = false;

      for (let index = 0; index < event.results.length; index += 1) {
        const result = event.results[index];
        transcript += result[0]?.transcript ?? "";
        hasFinalResult ||= result.isFinal;
      }

      this.latestTranscript = transcript.trim();
      this.transcriptHandler(this.latestTranscript);

      if (hasFinalResult && this.latestTranscript) {
        this.finalTranscriptDelivered = true;
        this.finalTranscriptHandler(this.latestTranscript);
      }
    };

    this.recognition.onerror = (event) => {
      const message =
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
          ? "Microphone permission was denied."
          : `Voice recognition error: ${event.error}.`;

      this.errorHandler(message);
    };

    this.recognition.onend = () => {
      if (
        this.latestTranscript &&
        !this.finalTranscriptDelivered
      ) {
        this.finalTranscriptDelivered = true;
        this.finalTranscriptHandler(this.latestTranscript);
      }

      this.recognition = null;
      this.endHandler();
    };

    this.recognition.start();
  }

  stopListening() {
    this.recognition?.stop();
  }
}

export default SpeechRecognitionService;
