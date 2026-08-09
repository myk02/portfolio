import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-background px-6">
      <div className="max-w-md mx-auto text-center">
        <h1 className="font-display font-black text-foreground leading-none tracking-tight">
          <span className="block text-7xl sm:text-8xl">404</span>
          <span className="mt-3 block text-2xl sm:text-3xl">
            Page not found
          </span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground leading-snug">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className="btn btn-primary mt-8 inline-flex">
          ← Back home
        </Link>
      </div>
    </div>
  );
}
