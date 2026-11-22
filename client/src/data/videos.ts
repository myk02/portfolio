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
  {
    slug: "verification-code-scams",
    title: "How verification code scams work",
    description:
      "A message arrives asking you to read back the one-time code that just landed on your phone. The video shows how that code becomes the key to your account, and why the only safe answer is to never share it.",
    tag: "Account takeover",
    duration: "1:11",
    src: "/videos/how-verification-code-scams-work.mp4",
    poster: "/videos/verification-code-scams-poster.webp",
  },
  {
    slug: "fake-job-scams",
    title: "How fake job scams trap you",
    description:
      "A too-good-to-be-true job offer uses fabricated urgency and effortless rewards to rush you past the warning signs. The video shows where the trap closes and how to verify an opportunity first.",
    tag: "Job fraud",
    duration: "1:07",
    src: "/videos/how-fake-job-scams-trap-you.mp4",
    poster: "/videos/fake-job-scams-poster.webp",
  },
  {
    slug: "fake-wifi-hotspots",
    title: "How fake Wi-Fi hotspots steal passwords",
    description:
      "A rogue hotspot mimics a coffee shop or hotel network without a password. The video breaks down how attackers intercept credentials and traffic in transit, and why a VPN or cellular data keeps you safe.",
    tag: "Network security",
    duration: "0:33",
    src: "/videos/how-fake-wifi-hotspots-steal-passwords.mp4",
    poster: "/videos/fake-wifi-hotspots-poster.webp",
  },
];
