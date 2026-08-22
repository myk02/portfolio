import {
  experienceEntries,
  isEntryComplete,
  type ExperienceEntry,
} from "@/data/experience";

function EntryMeta({ entry }: { entry: ExperienceEntry }) {
  const parts = [entry.title, entry.dates, entry.location].filter(
    Boolean
  ) as string[];
  return (
    <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
      {parts.join(" · ")}
    </p>
  );
}

/**
 * Professional experience timeline.
 *
 * Production renders ONLY fully-confirmed entries (exact title + dates +
 * description present). Entries still awaiting Mike's LinkedIn text preview
 * exclusively in dev builds behind a "Details to be confirmed" label.
 *
 * NOTE: the dev gate uses `import.meta.env.DEV` inline (not an imported
 * constant) so Vite statically replaces it and dead-code-eliminates every
 * placeholder string from the production bundle.
 */
export default function ExperienceTimeline() {
  const complete = experienceEntries.filter(isEntryComplete);
  const pending = experienceEntries.filter(e => !isEntryComplete(e));

  if (complete.length === 0 && pending.length === 0) return null;

  return (
    <div>
      <h3 className="font-medium text-foreground mb-5">Experience</h3>
      <ol className="space-y-6 border-l border-border pl-5">
        {complete.map(entry => (
          <li key={entry.id} className="relative">
            <span
              aria-hidden
              className="absolute -left-[26px] top-[7px] w-2 h-2 bg-accent"
            />
            <p className="font-display font-bold text-foreground leading-snug">
              {entry.title} · {entry.employer}
            </p>
            <EntryMeta entry={entry} />
            <p className="text-sm text-muted-foreground leading-relaxed mt-1.5 max-w-xl">
              {entry.description}
            </p>
            {entry.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {entry.technologies.map(t => (
                  <span key={t} className="tag-pill text-xs">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}

        {/* DEV-ONLY preview of entries awaiting confirmation — stripped from prod */}
        {import.meta.env.DEV &&
          pending.map(entry => (
            <li key={entry.id} className="relative" data-pending="true">
              <span
                aria-hidden
                className="absolute -left-[26px] top-[7px] w-2 h-2 border border-dashed border-muted-foreground bg-transparent"
              />
              <div className="border border-dashed border-border bg-card/50 p-4">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-display font-bold text-foreground leading-snug">
                    {entry.employer}
                  </p>
                  <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest border border-border text-muted-foreground">
                    Details to be confirmed · dev only
                  </span>
                </div>
                <EntryMeta entry={entry} />
                <p className="text-xs text-muted-foreground mt-2 font-mono uppercase tracking-wider">
                  Awaiting: {entry.todo.join(", ")}
                </p>
              </div>
            </li>
          ))}
      </ol>

      {complete.length === 0 && (
        <p className="text-xs text-muted-foreground mt-4 leading-snug max-w-xl">
          Full employment history publishes here once exact titles and dates are
          confirmed — nothing is guessed on this site.
        </p>
      )}
    </div>
  );
}
