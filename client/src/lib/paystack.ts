export interface PaystackTransaction {
  id: number;
  reference: string;
  message: string;
  status?: string;
  transaction?: string;
  trxref?: string;
}

export interface PaystackCallbacks {
  onSuccess?: (transaction: PaystackTransaction) => void;
  onCancel?: () => void;
  onError?: (error: { message: string }) => void;
  onLoad?: (response: { id: number; accessCode: string; customer: unknown }) => void;
}

export interface PaystackPopInstance {
  resumeTransaction: (accessCode: string, callbacks?: PaystackCallbacks) => unknown;
}

declare global {
  interface Window {
    PaystackPop?: new () => PaystackPopInstance;
  }
}

let scriptPromise: Promise<void> | null = null;

export function loadPaystackInline(): Promise<void> {
  if (window.PaystackPop) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v2/inline.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Failed to load Paystack"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}
