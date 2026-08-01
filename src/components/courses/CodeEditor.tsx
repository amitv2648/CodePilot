import Editor from "@monaco-editor/react";

type CodeEditorProps = {
  language: string;
  initialCode: string;
  height?: string | number;
  onCodeChange?: (code: string) => void;
};

const monacoLanguageMap: Record<string, string> = {
  python: "python",
  java: "java",
  "c++": "cpp",
  javascript: "javascript",
  typescript: "typescript",
  html: "html",
  css: "css",
  react: "javascript",
};

function CodeEditor({
  language,
  initialCode,
  height = "450px",
  onCodeChange,
}: CodeEditorProps) {
  const editorLanguage =
    monacoLanguageMap[language.toLowerCase()] ?? "plaintext";

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
      <Editor
        key={`${editorLanguage}:${initialCode}`}
        height={height}
        language={editorLanguage}
        defaultValue={initialCode}
        theme="vs-dark"
        onChange={(value) => onCodeChange?.(value ?? "")}
        loading={
          <div className="flex h-full items-center justify-center bg-slate-950 text-slate-400">
            Loading editor...
          </div>
        }
        options={{
          automaticLayout: true,
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}

export default CodeEditor;
