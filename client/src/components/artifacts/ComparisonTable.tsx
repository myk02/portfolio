export interface ComparisonRow {
  metric: string;
  baseline: string;
  target: string;
  result: string;
}

/**
 * Outcome table. Every row renders at full opacity (no staggered reveal), and
 * the Result column carries the highlight treatment.
 */
export default function ComparisonTable({
  rows,
  caption = "Measured against the baseline",
}: {
  rows: ComparisonRow[];
  caption?: string;
}) {
  return (
    <figure className="border border-border bg-card overflow-hidden">
      <figcaption className="px-4 py-2.5 border-b border-border text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
        {caption}
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[420px]">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                Metric
              </th>
              <th scope="col" className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                Baseline
              </th>
              <th scope="col" className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                Target
              </th>
              <th scope="col" className="px-4 py-2.5 text-[11px] font-mono uppercase tracking-widest text-foreground bg-accent/20">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.metric} className="border-b border-border last:border-b-0 align-top">
                <th scope="row" className="px-4 py-3 text-sm font-medium text-foreground text-left">
                  {row.metric}
                </th>
                <td className="px-4 py-3 text-sm text-muted-foreground">{row.baseline}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{row.target}</td>
                <td className="px-4 py-3 text-sm font-semibold text-foreground bg-accent/10">
                  <span className="inline-flex items-start gap-2">
                    <span aria-hidden className="mt-[0.42rem] w-1.5 h-1.5 bg-accent shrink-0" />
                    {row.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
