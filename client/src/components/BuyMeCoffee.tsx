import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee, X } from "lucide-react";
import { useAction } from "convex/react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { cn } from "@/lib/utils";
import { loadPaystackInline, type PaystackTransaction } from "@/lib/paystack";

type Currency = "KES" | "USD";

const PRESETS: Record<Currency, number[]> = {
  KES: [200, 500, 1000],
  USD: [3, 5, 10],
};

const CURRENCY_SYMBOL: Record<Currency, string> = {
  KES: "KSh",
  USD: "$",
};

const inputClass =
  "w-full bg-card border border-border px-4 min-h-[44px] text-[16px] text-foreground placeholder:text-foreground/60 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/40";

interface BuyMeCoffeeProps {
  label?: string;
  buttonClassName?: string;
  onDark?: boolean;
}

export default function BuyMeCoffee({
  label = "Buy me a coffee",
  buttonClassName,
  onDark = false,
}: BuyMeCoffeeProps) {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>("KES");
  const [preset, setPreset] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "working" | "verifying">("idle");
  const [error, setError] = useState("");

  const initializePayment = useAction(api.donations.initialize);
  const verifyPayment = useAction(api.donations.verify);

  const customAmount = Number(custom);
  const amount = preset ?? (custom.trim() === "" ? NaN : customAmount);
  const amountMinor = Math.round(amount * 100);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setError("");
    setStatus("idle");
    // Clear PII on close — prevents next visitor seeing previous email/amount
    setEmail("");
    setCustom("");
    setPreset(null);
  };

  const handleSuccess = async (transaction: PaystackTransaction) => {
    setStatus("verifying");
    try {
      const result = await verifyPayment({ reference: transaction.reference });
      if (result?.ok) {
        toast.success("Asante! Coffee on the way.");
      } else {
        toast.warning(
          "Payment completed, but automatic confirmation didn't go through. It will be reconciled shortly — thank you!"
        );
      }
    } catch {
      toast.warning(
        "Payment completed — confirmation is pending and will be reconciled automatically. Thank you!"
      );
    }
    close();
  };

  const handlePay = async () => {
    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Please choose or enter an amount.");
      return;
    }
    setError("");
    setStatus("working");
    try {
      const { accessCode } = await initializePayment({
        email: trimmedEmail,
        amount: amountMinor,
        currency,
      });
      await loadPaystackInline();
      const Paystack = window.PaystackPop;
      if (!Paystack) {
        setStatus("idle");
        setError("Payment couldn't be loaded. Please try again.");
        return;
      }
      const popup = new Paystack();
      popup.resumeTransaction(accessCode, {
        onSuccess: handleSuccess,
        onCancel: () => {
          setStatus("idle");
        },
        onError: (err) => {
          setStatus("idle");
          setError(err.message ?? "Payment failed to load. Please try again.");
        },
      });
    } catch {
      setStatus("idle");
      setError("Couldn't start the payment. Please try again.");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "btn",
          onDark
            ? "border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            : "btn-secondary",
          buttonClassName
        )}
      >
        <Coffee size={16} />
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Buy Mike a coffee"
              className="w-full max-w-md bg-card border border-border text-foreground"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-border px-6 py-5">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1">
                    Support the work
                  </p>
                  <h3 className="font-display font-bold text-2xl text-foreground">
                    Buy me a coffee
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="p-2 -m-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(PRESETS) as Currency[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCurrency(c);
                        setPreset(null);
                      }}
                      className={cn(
                        "px-3 py-2 text-sm font-medium border transition-colors",
                        currency === c
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                    Amount
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESETS[currency].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setPreset(value);
                          setCustom("");
                        }}
                        className={cn(
                          "px-3 py-2.5 text-sm font-medium border transition-colors",
                          preset === value
                            ? "bg-foreground text-background border-foreground"
                            : "border-border text-foreground hover:border-foreground"
                        )}
                      >
                        {CURRENCY_SYMBOL[currency]} {value}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.target.value);
                      setPreset(null);
                    }}
                    placeholder={`Custom amount (${CURRENCY_SYMBOL[currency]})`}
                    className={cn(inputClass, "mt-2")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="coffee-email"
                    className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="coffee-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm text-destructive">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  disabled={status !== "idle"}
                  onClick={handlePay}
                  className="btn btn-primary w-full"
                >
                  {status === "working"
                    ? "Preparing payment..."
                    : status === "verifying"
                      ? "Confirming..."
                      : "Pay with Paystack"}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  Secured by Paystack · Cards, bank transfer, USSD &amp; mobile money
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
