import { Github, Linkedin, Mail } from "lucide-react";
import { CONTACT } from "@/lib/site";
import BuyMeCoffee from "@/components/BuyMeCoffee";

export default function SiteFooter() {
  return (
    <footer className="bg-foreground text-background border-t-[3px] border-accent">
      <div className="container py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm font-medium">Mike Waitindi <span className="text-background/55">· Nairobi, Kenya</span></p>
        <nav aria-label="Footer links" className="flex items-center gap-4">
          <a href={CONTACT.emailHref} aria-label="Email" className="text-background/65 hover:text-accent"><Mail size={17} /></a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-background/65 hover:text-accent"><Github size={17} /></a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-background/65 hover:text-accent"><Linkedin size={17} /></a>
        </nav>
        <BuyMeCoffee
          buttonClassName="bg-accent text-accent-foreground border border-accent hover:bg-background hover:text-foreground hover:border-background text-xs px-3 py-2"
        />
        <p className="text-xs text-background/50">© {new Date().getFullYear()} · Built in Nairobi</p>
      </div>
    </footer>
  );
}
