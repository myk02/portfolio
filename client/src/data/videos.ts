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
      "A fake 'payment received' alert, a believable bank-ledger story, then a request to send the money back. The video shows why the screen looks real and where the money actually is.",
    tag: "Payment fraud",
    duration: "1:14",
    src: "/videos/how-fake-payment-scams-trap-you.mp4",
    poster: "/videos/fake-payment-scams-poster.webp",
  },
  {
    slug: "fake-urgent-alerts",
    title: "How hackers fake urgent alerts",
    description:
      "A spoofed 'account suspended' countdown and a lookalike URL create panic before you can check. The video slows that moment down and shows the trap.",
    tag: "Phishing",
    duration: "1:04",
    src: "/videos/how-hackers-fake-urgent-alerts.mp4",
    poster: "/videos/fake-urgent-alerts-poster.webp",
  },
];
