import { useState, useEffect } from "react";

interface JsonViewerProps {
  path: string;
}

export default function JsonViewer({ path }: JsonViewerProps) {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(path)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load (${r.status})`);
        return r.json();
      })
      .then((json) => setContent(JSON.stringify(json, null, 2)))
      .catch((e) => setError(e.message));
  }, [path]);

  if (error) {
    return <p className="text-red-400 font-mono text-xs p-4">{error}</p>;
  }

  return (
    <pre className="flex-1 overflow-auto p-4 bg-muted/60 text-[11px] leading-relaxed font-mono text-foreground rounded border border-border whitespace-pre-wrap break-all">
      {content || "Loading..."}
    </pre>
  );
}
