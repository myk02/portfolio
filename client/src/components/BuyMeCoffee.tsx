import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
}

export default function BuyMeCoffee({
  label = "Buy me a coffee",
  buttonClassName,
}: BuyMeCoffeeProps) {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>("KES");
  const [preset, setPreset] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "working" | "verifying">("idle");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailId = useId();

  const initializePayment = useAction(api.donations.initialize);
  const verifyPayment = useAction(api.donations.verify);

  const customAmount = Number(custom);
  const amount = preset ?? (custom.trim() === "" ? NaN : customAmount);
  const amountMinor = Math.round(amount * 100);

  const close = () => {
    setOpen(false);
    setError("");
    setStatus("idle");
    // Clear PII on close — prevents next visitor seeing previous email/amount
    setEmail("");
    setCustom("");
    setPreset(null);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    // Focus the dialog so keyboard users land inside it, not behind it.
    dialogRef.current?.focus?.();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

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
    const limits: Record<Currency, { min: number; max: number }> = {
      KES: { min: 50, max: 10000 },
      USD: { min: 1, max: 100 },
    };
    const { min, max } = limits[currency];
    if (amount < min || amount > max) {
      setError(`Amount must be between ${CURRENCY_SYMBOL[currency]} ${min} and ${max}.`);
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
    } catch (err) {
      setStatus("idle");
      const message = err instanceof Error ? err.message : "";
      setError(
        /not configured/i.test(message)
          ? "Tips are disabled on this deployment (payment key not configured). Please use the contact form instead — thank you!"
          : "Couldn't start the payment. Please try again.",
      );
    }
  };

  // NOTE: AnimatePresence must live *inside* the portal. A portal object as a
  // direct child of AnimatePresence breaks its child tracking and the dialog
  // never appears — that was the "click does nothing" bug.
  const canPortal = typeof document !== "undefined";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("btn btn-secondary", buttonClassName)}
      >
        <Coffee size={16} />
        {label}
      </button>

      {canPortal &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[100] flex overflow-y-auto bg-black/60 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
              >
                <motion.div
                  ref={dialogRef}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Buy Mike a coffee"
                  tabIndex={-1}
                  className="m-auto w-full max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain bg-card border border-border text-foreground shadow-xl outline-none"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between border-b border-border px-6 py-5">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1">
                        Support the work
                      </p>
                      <h3 className="font-display font-semibold text-[1.25rem] tracking-[-0.015em] leading-tight text-foreground">
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
                        htmlFor={emailId}
                        className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id={emailId}
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
                      Paystack · Card / M-Pesa / Bank
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
