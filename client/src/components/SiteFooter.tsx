import { CONTACT } from "@/lib/site";
import { positionTitle } from "@/data/siteContent";
import BuyMeCoffee from "@/components/BuyMeCoffee";
import {
  TikTokBrandIcon,
  LinkedInBrandIcon,
  GitHubBrandIcon,
  GmailBrandIcon,
} from "@/components/BrandIcons";

export default function SiteFooter() {
  return (
    <footer className="bg-foreground text-background border-t-[3px] border-accent">
      <div className="container py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium">
            Mike Waitindi{" "}
            <span className="text-background/55">· Nairobi, Kenya</span>
          </p>
          <p className="mt-1 text-[10px] font-mono uppercase tracking-widest text-background/50">
            {positionTitle}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <nav aria-label="Footer links" className="flex items-center gap-3">
            <a
              href={CONTACT.tiktok}
              target="_blank"
              rel="noopener noreferrer"
                aria-label="TikTok @aiwithmike1"
                title="TikTok @aiwithmike1"
              className="p-1.5 rounded transition-transform hover:scale-110"
            >
              <TikTokBrandIcon size={18} />
            </a>
            <a
              href={CONTACT.emailHref}
              aria-label="Email"
              title="Email Mike"
              className="p-1.5 rounded transition-transform hover:scale-110"
            >
              <GmailBrandIcon size={18} />
            </a>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub profile"
              className="p-1.5 rounded transition-transform hover:scale-110"
            >
              <GitHubBrandIcon size={18} />
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn profile"
              className="p-1.5 rounded transition-transform hover:scale-110"
            >
              <LinkedInBrandIcon size={18} />
            </a>
          </nav>
          <BuyMeCoffee buttonClassName="bg-accent text-accent-foreground border border-accent hover:bg-background hover:text-foreground hover:border-background text-xs px-3 py-2" />
        </div>
      </div>
      <div className="container pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-background/50">
        <p>© {new Date().getFullYear()} · Built in Nairobi</p>
        <p className="font-mono text-[11px]">
          AI with Mike:{" "}
          <a
            href={CONTACT.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            tiktok.com/@aiwithmike1
          </a>
        </p>
      </div>
    </footer>
  );
}
