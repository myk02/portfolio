import { Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/ui/section";
import { aboutParagraph } from "@/data/siteContent";
import { CONTACT } from "@/lib/site";

const links = [
  { href: CONTACT.github, label: "GitHub", icon: Github },
  { href: CONTACT.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: CONTACT.emailHref, label: "Email", icon: Mail },
];

export default function About() {
  return (
    <section id="about" className="section-pad bg-secondary border-t border-border">
      <div className="container max-w-4xl">
        <Reveal>
          <SectionLabel>About</SectionLabel>
          <h2 className="heading-section text-foreground mt-2">Mike Waitindi</h2>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground leading-relaxed">
            {aboutParagraph}
          </p>
          <nav aria-label="Professional links" className="mt-6 flex flex-wrap gap-3">
            {links.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={label === "Email" ? undefined : "_blank"}
                rel={label === "Email" ? undefined : "noopener noreferrer"}
                className="inline-flex min-h-10 items-center gap-2 border border-border px-3 text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <Icon size={15} aria-hidden /> {label}
              </a>
            ))}
          </nav>
        </Reveal>
      </div>
    </section>
  );
}
