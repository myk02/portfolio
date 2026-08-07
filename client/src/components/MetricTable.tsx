import type { MetricRow } from "@/data/caseVisuals";
import { Reveal } from "@/components/Reveal";

export default function MetricTable({
  metrics,
  roadmap,
  outcomeDetail,
}: {
  metrics: MetricRow[];
  roadmap: string[];
  outcomeDetail: string;
}) {
  return (
    <div className="space-y-4">
      <div className="border border-border bg-card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Metric</th>
              <th className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Baseline</th>
              <th className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Target</th>
              <th className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-accent">Result</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((m, i) => (
              <tr
                key={m.metric}
                className="border-b border-border last:border-b-0"
                style={{ ["--i" as string]: i }}
                data-reveal
              >
                <td className="px-4 py-3 text-sm text-foreground font-medium">{m.metric}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{m.baseline}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{m.target}</td>
                <td className="px-4 py-3 text-sm font-semibold bg-accent/10 text-foreground">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent shrink-0" />
                    {m.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">{outcomeDetail}</p>

      <div className="border border-border bg-card p-4">
        <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
          Next — V2 roadmap
        </p>
        <div className="flex flex-wrap gap-2">
          {roadmap.map((item, i) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-border text-xs text-foreground"
            >
              <span className="font-mono text-[10px] text-accent">V2.{i + 1}</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
