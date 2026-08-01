type OutputConfig = {
  batched: (message: string) => void;
};

type PythonResult = {
  destroy?: () => void;
  toString: () => string;
};

type PyodideRuntime = {
  runPythonAsync: (code: string) => Promise<PythonResult | null>;
  setStdout: (config: OutputConfig) => void;
  setStderr: (config: OutputConfig) => void;
};

type LoadPyodide = (options: {
  indexURL: string;
}) => Promise<PyodideRuntime>;

type PyodideWindow = Window & {
  loadPyodide?: LoadPyodide;
};

export type PythonExecutionResult = {
  output: string;
  succeeded: boolean;
};

const PYODIDE_VERSION = "0.27.7";
const PYODIDE_BASE_URL =
  `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const PYODIDE_SCRIPT_URL = `${PYODIDE_BASE_URL}pyodide.js`;

let runtimePromise: Promise<PyodideRuntime> | null = null;

function loadPyodideScript() {
  const pyodideWindow = window as PyodideWindow;

  if (pyodideWindow.loadPyodide) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${PYODIDE_SCRIPT_URL}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), {
        once: true,
      });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Python runtime failed to load.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = PYODIDE_SCRIPT_URL;
    script.async = true;
    script.addEventListener("load", () => resolve(), {
      once: true,
    });
    script.addEventListener(
      "error",
      () => reject(new Error("Python runtime failed to load.")),
      { once: true },
    );
    document.head.appendChild(script);
  });
}

async function getPythonRuntime() {
  if (!runtimePromise) {
    runtimePromise = loadPyodideScript().then(() => {
      const loadPyodide = (window as PyodideWindow).loadPyodide;

      if (!loadPyodide) {
        throw new Error("Python runtime is unavailable.");
      }

      return loadPyodide({
        indexURL: PYODIDE_BASE_URL,
      });
    });
  }

  return runtimePromise;
}

class PythonExecutionService {
  async execute(code: string): Promise<PythonExecutionResult> {
    const runtime = await getPythonRuntime();
    const outputLines: string[] = [];
    const errorLines: string[] = [];

    runtime.setStdout({
      batched: (message) => outputLines.push(message),
    });
    runtime.setStderr({
      batched: (message) => errorLines.push(message),
    });

    try {
      const result = await runtime.runPythonAsync(code);

      if (result) {
        const resultText = result.toString();

        if (resultText !== "None") {
          outputLines.push(resultText);
        }

        result.destroy?.();
      }

      return {
        output:
          outputLines.join("\n") ||
          "Program finished with no output.",
        succeeded: true,
      };
    } catch (executionError) {
      const errorMessage =
        executionError instanceof Error
          ? executionError.message
          : String(executionError);

      return {
        output: [...errorLines, errorMessage]
          .filter(Boolean)
          .join("\n"),
        succeeded: false,
      };
    }
  }
}

export default PythonExecutionService;
