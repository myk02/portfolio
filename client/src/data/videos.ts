export interface ProofVideo {
  slug: string;
  title: string;
  description: string;
  tag: string;
  duration: string;
  src: string;
  poster: string;
}

/** Short-form cybersecurity explainers published on the AI with Mike channel. */
export const proofVideos: ProofVideo[] = [
  {
    slug: "fake-payment-scams",
    title: "How fake payment scams trap you",
    description:
      "A fake 'payment received' alert that ends in a refund request.",
    tag: "Payment fraud",
    duration: "1:14",
    src: "/videos/how-fake-payment-scams-trap-you.mp4",
    poster: "/videos/fake-payment-scams-poster.webp",
  },
  {
    slug: "fake-urgent-alerts",
    title: "How hackers fake urgent alerts",
    description:
      "A spoofed countdown and a lookalike URL that creates panic.",
    tag: "Phishing",
    duration: "1:04",
    src: "/videos/how-hackers-fake-urgent-alerts.mp4",
    poster: "/videos/fake-urgent-alerts-poster.webp",
  },
  {
    slug: "verification-code-scams",
    title: "How verification code scams work",
    description:
      "Someone asks you to read back the one-time code on your phone.",
    tag: "Account takeover",
    duration: "1:11",
    src: "/videos/how-verification-code-scams-work.mp4",
    poster: "/videos/verification-code-scams-poster.webp",
  },
  {
    slug: "fake-job-scams",
    title: "How fake job scams trap you",
    description:
      "A too-good-to-be-true offer that rushes you past the warning signs.",
    tag: "Job fraud",
    duration: "1:07",
    src: "/videos/how-fake-job-scams-trap-you.mp4",
    poster: "/videos/fake-job-scams-poster.webp",
  },
  {
    slug: "fake-wifi-hotspots",
    title: "How fake Wi-Fi hotspots steal passwords",
    description:
      "A rogue hotspot that harvests the passwords you type into it.",
    tag: "Network security",
    duration: "0:33",
    src: "/videos/how-fake-wifi-hotspots-steal-passwords.mp4",
    poster: "/videos/fake-wifi-hotspots-poster.webp",
  },
];
